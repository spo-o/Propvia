import { supabase } from '../services/supabaseClient';
import { PLAN_LIMITS } from './subscriptionLimit';

type UsageType = 'ask_count' | 'analysis_count' | 'scenario_count';
type PlanKey = keyof typeof PLAN_LIMITS;

export const checkUsageLimit = async (
  userId: string,
  usageType: UsageType
): Promise<{ allowed: boolean; message?: string }> => {
  const { data: user, error } = await supabase
    .from('users')
    .select('plan, ask_count, analysis_count, scenario_count, subscription_active')
    .eq('id', userId)
    .single();

  if (error || !user) {
    console.error(' Failed to fetch user or user not found:', error);
    return { allowed: false, message: 'User not found.' };
  }

  const plan = user.plan as string;
  console.log(' User plan:', plan);

  if (!(plan in PLAN_LIMITS)) {
    console.error('⚠️ Unknown subscription plan:', plan);
    return { allowed: false, message: 'Unknown subscription plan.' };
  }

  const limits = PLAN_LIMITS[plan as PlanKey];
  const currentRemaining = user[usageType]; // Remaining quota

  console.log(` Usage check for ${usageType}:`);
  console.log('Current remaining:', currentRemaining);
  console.log('Allowed limit:', limits[usageType.replace('_count', 'Limit') as keyof typeof limits]);

  const isAllowed = currentRemaining > 0;

  return {
    allowed: isAllowed,
    message: isAllowed ? undefined : `Limit reached for ${usageType.replace('_', ' ')}`,
  };
};

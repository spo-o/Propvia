import React from 'react'
import { SavedScenario } from '../types';



interface ReportsCenterProps {
  savedScenarios: SavedScenario[];
}

export default function RequestsList({ savedScenarios = [] }: ReportsCenterProps) {
  return <div className='mt-10'>
    <h1>Save Custom Request Analysis Reports HERE</h1>
  </div>;
}
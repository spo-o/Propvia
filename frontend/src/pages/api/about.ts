import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    hero: {
      title: "Transforming Detroit Through AI Innovation",
      subtitle: "Propvia is revolutionizing commercial property analysis through advanced AI and data analytics, helping businesses make smarter real estate decisions."
    },
    mission: "To empower businesses with data-driven insights and AI-powered analytics, making commercial property decisions more transparent, efficient, and profitable while transforming Detroit's urban landscape one property at a time.",
    vision: "To become the global standard for commercial property analysis, helping businesses worldwide unlock the full potential of their real estate investments and create thriving, sustainable communities.",
    values: [
      {
        title: "Innovation",
        description: "Continuously pushing boundaries with cutting-edge technology and AI solutions that transform the industry."
      },
      {
        title: "Transparency",
        description: "Providing clear, actionable insights backed by reliable data and honest communication at every step."
      },
      {
        title: "Excellence",
        description: "Delivering the highest quality analysis and customer service, exceeding expectations every time."
      },
      {
        title: "Integrity",
        description: "Building trust through honest, ethical business practices and genuine commitment to our community."
      }
    ]
  });
}
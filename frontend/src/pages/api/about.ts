import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    hero: {
      title: "Transforming Detroit Through AI Innovation",
      subtitle: "Propvia is revolutionizing commercial property analysis through advanced AI and data analytics, helping businesses make smarter real estate decisions."
    },
    mission: "...",
    vision: "...",
    values: [
      {
        title: "Innovation",
        description: "..."
      },
      {
        title: "Transparency",
        description: "..."
      },
      {
        title: "Excellence",
        description: "..."
      },
      {
        title: "Integrity",
        description: "..."
      }
    ]
  });
}
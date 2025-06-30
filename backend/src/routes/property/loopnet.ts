import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/live', async (req, res) => {
  try {
    console.log("Using API key:", process.env.RAPIDAPI_KEY);

    const response = await axios.post(
      'https://loopnet-api.p.rapidapi.com/loopnet/v2/lease/searchByAddress',
      {
        country: 'US',
        state: 'MI',
        city: 'Detroit',
        page: 1,
        zipCode: null,
        county: null,
      },
      {
        headers: {
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
          'X-RapidAPI-Host': 'loopnet-api.p.rapidapi.com',
          'Content-Type': 'application/json',
        },
      }
    );

    const listings = response.data?.data?.[0]?.listings || [];
    const slicedIds = listings.slice(0, 10).map((item: any) => item.listingID?.toString());

    console.log("🔍 Sliced Listing IDs:", slicedIds);

    if (slicedIds.length === 0) {
      res.json([]);
      return;
    }

    const bulkRes = await axios.post(
        'https://loopnet-api.p.rapidapi.com/loopnet/property/bulkDetails',
        {
          listingIds: slicedIds,
        },
        {
          headers: {
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
            'X-RapidAPI-Host': 'loopnet-api.p.rapidapi.com',
            'Content-Type': 'application/json',
          },
        }
      );
    const details = bulkRes.data?.data || [];
    console.log("📦 Bulk Details Fetched:", details.length);

    // ✅ Format listings to match frontend shape
    const simplified = details.map((item: any) => {
        const sqftMatch = item.location?.availableSpace?.match(/([\d,]+)/);
        const parsedSqft = sqftMatch ? parseInt(sqftMatch[1].replace(/,/g, '')) : 0;
        const id = item.listingId?.toString();
        const match = slicedIds.find((s: any) => s.listingID?.toString() === id);

      
        return {
          id: item.listingId?.toString(),
          address: item.location?.address || 'Unknown Address',
          sqft: parsedSqft,
          latitude: match?.latitude ?? null,
        longitude: match?.longitude ?? null,
          price: typeof item.price === 'string' && item.price.startsWith('$')
            ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
            : 0,
          zoning: item.listingType || 'unknown',
          image: item.photo || null,
        };
      });
      

      res.json(simplified);
    } catch (err: any) {
      console.error('LoopNet API error:', err.response?.data || err.message);
      res.status(500).json({ error: 'Failed to fetch live properties' });
    }
  });

export default router;
import { NextApiRequest, NextApiResponse } from 'next';
import products from '../../../utils/data/products';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { pid },
  } = req;

  const product = products.find((x) => x.id === pid);

  if (!product) {
    res.status(404).json({ message: 'Product not found' });
    return;
  }

  res.setHeader('Cache-Control', 'public, s-maxage=60, stale-while-revalidate=30');
  res.status(200).json(product);
};
import prisma from "../db";

export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};
export const getAllUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });
const  updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
}, []);

    res.json({ data: updates });
};
   
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findFirst({
        where: {
            id: req.body.productId,
        },
    });

    if (!product) {
        res.status(400).json({ error: "Product not found" });
        return;
    }

    const update = await prisma.update.create({
        data: req.body,
    });

    res.json({ data: update });
};
export const updatedUpdate = async (req, res) => {};
export const deleteUpdate = async (req, res) => {};

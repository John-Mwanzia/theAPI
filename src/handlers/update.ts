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
export const updatedUpdate = async (req, res) => {
    // Fetch products from the database that belong to the user
    const product = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true,
        },
    });

    // Accumulate all the updates from the products into a single array
    const updates = product.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, []);

    // Find the update that matches the given ID in the request parameters
    const match = updates.find((update) => update.id === req.params.id);

    // If no match is found, send an error response
    if (!match) {
        res.status(400).json({ error: "Update not found" });
        return;
    }

    // Update the specified update with the new data
    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id,
        },
        data: req.body,
    });

    res.json({ data: updatedUpdate });
};

export const deleteUpdate = async (req, res) => {};

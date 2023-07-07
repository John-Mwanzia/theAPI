import prisma from "../db"

//get all products
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where:{
            id: req.user.id,
        },
        include:{
            products: true,
        }
    })
    res.json({data: user.products});
}

//get one product
export const getProduct = async (req, res) => {
    const id = req.params.id;
    const product = await prisma.product.findFirst({
        where:{
            id,
            belongsToId: req.user.id,
        },
    })
    res.json({data: product});
}

//create new product

export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data:{
            name: req.body.name,
            belongsToId: req.user.id,
        }
    })
    res.json({data: product});
}

//update product

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const updatedProduct = await prisma.product.update({    //in update we have to specify where we want to update and what we want to update with data object 
        where:{
            id,
            belongsToId: req.user.id,
        },
        data:{
            name: req.body.name,
        }
    })
    res.json({data: updatedProduct});
}


//delete product

export const deleteProduct = async (req, res) => {
    const id = req.params.id;
    const deletedProduct = await prisma.product.delete({
        where:{
            id,
            belongsToId: req.user.id,
        }
    })
    res.json({data: deletedProduct});
}
import db from "../models/index.js";
import fs from "fs"
import path from "path"

const Product = db.products;

const listProduct = async (req, res) => {
    Product.findAll()
    .then(data => {
        res.json({success: "true", data:data})
    })
    .catch(err => {
        res.status(500).json({
        message:
            err.message || "Some error occurred while fetching the Data."
        });
    });
}

const addProduct = async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
        return;
      }

    let image_filename = `${req.file.filename}`;

    const product = {
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    }
    Product.create(product)
    .then(data => {
      res.json({success: "true", message: "Data Has Been Added.", data:data})
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while creating the Data."
      });
    });

}

const removeProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByPk(id);
        fs.unlink(`uploads/${product.image}`, () => {})
    } catch(err) {
        return res.status(404).json({
            success: false,
            message: `Cannot delete Data with id=${id}. Data was not found!`
        });
    }
    Product.destroy({
        where: { id : id }
    })
    .then(num => {
        if(num == 1) {
            res.json({success:"true", message:"Data Has Been Deleted"});
        } else {
            res.json({success:"false", message:`Cannot delete Data with id=${id}. Data was not found!`})
        }
    })
    .catch(err => {
        res.status(500).json({
        message:
          err.message || "Some error occurred while deleting the Data."
        })
    })
}

const updateProduct = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Cannot update Data with id=${id}. Data was not found!`
            });
        }

        if (req.file) {
            if (product.image) {
                fs.unlink(`uploads/${product.image}`, (err) => {
                    if (err) {
                        return res.status(500).json({
                            message: err.message || "Cannot delete old image."
                        });
                    }
                });
            }

            req.body.image = req.file.filename;
        }

        const [num] = await Product.update(req.body, {
            where: { id: id }
        });

        if (num == 1) {
            res.json({ success: true, message: "Data has been updated" });
        } else {
            res.json({ success: false, message: `Cannot update Data with id=${id}. Data was not found!` });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the Data."
        });
    }
}

const getProductById = async (req, res) => {
    const id = req.params.id;
    Product.findByPk(id)
    .then(data => {
        res.json({success: "true", data:data})
    })
    .catch(err => {
        res.status(500).json({
        message:
            err.message || "Some error occurred while fetching the Data."
        });
    });
}

const bulkAddProducts = async (req, res) => {
    const items = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'Invalid request. Expecting an array of items.' });
    }

    try {
        let products = items.map(item => ({
            name: item.name,
            price: item.price,
            description: item.description,
            category: item.category
        }));

        let createdProducts = await Product.bulkCreate(products);

        res.json({ success: true, message: 'Data has been added.', data: createdProducts });
    } catch (err) {
        console.error('Error occurred while inserting products:', err);
        res.status(500).json({ message: 'Some error occurred while creating the data.' });
    }
}

const updateImage = async (req, res) => {
    const id = req.params.id;

    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({
                success: false,
                message: `Cannot update image for product with id=${id}. Product was not found!`
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image file uploaded."
            });
        }

        if (product.image) {
            fs.unlink(`uploads/${product.image}`, (err) => {
                if (err) {
                    return res.status(500).json({
                        message: err.message || "Cannot delete old image."
                    });
                }
            });
        }

        const updatedProduct = await Product.update({ image: req.file.filename }, {
            where: { id: id }
        });

        if (updatedProduct == 1) {
            res.json({ success: true, message: "Image has been updated" });
        } else {
            res.json({ success: false, message: `Cannot update image for product with id=${id}.` });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message || "Some error occurred while updating the image."
        });
    }
};



export {addProduct, listProduct, removeProduct, updateProduct, getProductById, bulkAddProducts, updateImage}
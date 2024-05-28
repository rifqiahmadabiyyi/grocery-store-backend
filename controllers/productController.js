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
            fs.unlink(`uploads/${product.image}`, (err) => {
                if(err) {
                    res.status(500).json({
                    message:
                        err.message || "Cannot delete old image."
                    })
                }
            })

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



export {addProduct, listProduct, removeProduct, updateProduct}
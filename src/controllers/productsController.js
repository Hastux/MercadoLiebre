const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render('products',{products, toThousand})

	},

	// Detail - Detail from one product
	detail: (req, res) => {
		let idProduct = req.params.productId;
		let productEncontrado = products.find(product => product.id == idProduct);			
		res.render('detail',{productEncontrado, toThousand})

	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let newProduct = { 
			id: products[products.length-1].id+1,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: 'default-image.png'
		}
		let newBase = [...products, newProduct];
		let newBaseJSON = JSON.stringify(newBase, null, ' ');
		fs.writeFileSync(productsFilePath,newBaseJSON);		
		res.redirect('/')
	},

	// Update - Form to edit
	edit: (req, res) => {
		let idProduct = req.params.productId;
		let productToEdit = products.find(product => product.id == idProduct);
		res.render('product-edit-form',{productToEdit})
	},
	// Update - Method to update
	update: (req, res) => {
			let idProduct = req.params.productId;

			products.forEach(product => {
			if (product.id == idProduct){
				product.name= req.body.name;
				product.price= req.body.price;
				product.discount= req.body.discount;
				product.category= req.body.category;
				product.description= req.body.description;
			} 

		});
		let productsJSON = JSON.stringify(products);
		fs.writeFileSync(productsFilePath, productsJSON);	
		res.redirect('/')
		
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let idProduct = req.params.productId;
		let productSinArticulo = products.filter(product => product.id != idProduct);
		let productSinArticuloJS = JSON.stringify(productSinArticulo);
		fs.writeFileSync(productsFilePath,productSinArticuloJS);
		res.redirect('/')
	}
};

module.exports = controller;
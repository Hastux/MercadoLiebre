const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		let productsVisited = products.filter( product => product.category == 'visited')
		let productsSale = products.filter( product => product.category == 'in-sale')
		
		res.render('index', {productsVisited, productsSale, toThousand})
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;

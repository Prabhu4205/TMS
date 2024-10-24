const Customer = require('../models/Customer');
const mongoose = require('mongoose');

exports.homepage = async (req, res) => {
    const messages = req.flash('info');
    const locals = {
        title: 'TMS',
        description: 'Transport Management System'
    };

    try {
      const customers = await Customer.find({}).limit(20);
      res.render('index', { locals, messages, customers } );
    } catch (error) {
      console.log(error);
    }
}

exports.about = async (req, res) => {
    const locals = {
        title: 'About',
        description: 'Transport Management System'
    };

    try {
      res.render('about', locals);
    } catch (error) {
      console.log(error);
    }
}

exports.addCustomer = async (req, res) => {
    const locals = {
        title: 'Add New Driver',
        description: 'Transport Management System'
    };
    res.render('customer/add', locals);
};

exports.postCustomer = async (req, res) => {
    console.log(req.body);

    const newCustomer = new Customer({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        detail: req.body.detail,
        ph: req.body.ph,
        vehicleinfo: req.body.vehicleinfo,
        email: req.body.email
    });

    try {
        await Customer.create(newCustomer);
        req.flash('info', 'New Driver has been added');
        res.redirect('/');
    } catch (error) {
        console.log(error);
        req.flash('error', 'Error adding driver. Please try again.');
        res.redirect('/add-customer');
    }
};

exports.view = async(req, res) =>{

    try{
        const customer = await Customer.findOne({_id: req.params.id})

        const locals = {
            title: 'View Driver',
            description: 'Transport Management System'
        };

        res.render('customer/view', {
            locals,
            customer
        })
    }
    catch(error){
        console.log(error);
    }
}

exports.edit = async(req, res) =>{

    try{
        const customer = await Customer.findOne({_id: req.params.id})

        const locals = {
            title: 'Edit Driver',
            description: 'Transport Management System'
        };

        res.render('customer/edit', {
            locals,
            customer
        })
    }
    catch(error){
        console.log(error);
    }
}


exports.editPost = async(req, res) =>{
    try {
        await Customer.findByIdAndUpdate(req.params.id,{
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            ph: req.body.ph,
            email: req.body.email,
            vehicleinfo: req.body.vehicleinfo,
            detail: req.body.detail,
            updatedAt: Date.now(0),
        });
        await res.redirect(`/edit/${req.params.id}`);
        
    } catch (error) {
        console.log(error)
    }
}

exports.deleteCustomer = async(req, res) =>{
    try {
        await Customer.deleteOne({_id: req.params.id});
        res.redirect("/")
    
    } catch (error) {
        console.log(error);
    
}
}

exports.searchCustomers = async(req, res) =>{

    const locals = {
        title: 'Search Driver',
        description: 'Transport Management System'
    };
try{
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "");

    const customers = await Customer.find({
        $or: [
            {firstname: {$regex: new RegExp(searchNoSpecialChar, "i")}},
            {lastname: {$regex: new RegExp(searchNoSpecialChar, "i")}}
        ]
    });

    res.render("search", {
        customers,
        locals
    })
}
catch(error) {
    console.log(error)
}
}
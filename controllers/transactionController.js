import db from "../models/index.js";
import midtransClient from "midtrans-client";

const Order = db.orders;
const Transaction = db.transactions;
const OrderItem = db.orderItems;

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY,
});


const checkout = async (req, res) => {
    try {
        const { user_id, order_id, items, total_amount, first_name, last_name, email, phone } = req.body;

        // Convert items array into Midtrans format
        const itemDetails = items.map(item => ({
            id: item.id,
            price: item.price,
            quantity: item.quantity,
            name: item.name
        }));

        const parameter = {
            transaction_details: {
                order_id: order_id,
                gross_amount: total_amount,
            },
            item_details: itemDetails,
            customer_details: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
            },
            credit_card: {
                secure: true,
            },
        };

        const transaction = await snap.createTransaction(parameter);

        const order = await Order.create({
            order_id: order_id,
            user_id: user_id,
            total_amount: total_amount
        });

        for (const item of items) {
            await OrderItem.create({
                order_id: order_id,
                item_id: item.id,
                item_name: item.name,
                quantity: item.quantity,
                price: item.price
            });
        }

        await Transaction.create({
            order_id: order_id,
            transaction_status: 'pending',
            gross_amount: total_amount,
            transaction_id: transaction.token,
        });

        const response = {
            message: 'Transaction created successfully',
            transaction_details: {
                token: transaction.token,
                redirect_url: transaction.redirect_url,
            },
            order_details: {
                order_id: order.order_id,
                user_id: order.user_id,
                total_amount: order.total_amount,
                items: itemDetails,
            },
            customer_details: {
                first_name: first_name,
                last_name: last_name,
                email: email,
                phone: phone,
            }
        };

        console.log(response);
        res.status(200).json(response);
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({ error: 'Error creating transaction', message: error.message});
    }
}


const notification = async (req, res) => {
    try {
        const {
            order_id,
            transaction_status,
            fraud_status,
            transaction_id,
            gross_amount,
            payment_type,
            transaction_time,
            va_numbers,
        } = req.body;

        const updateValues = {
            transaction_status: transaction_status || 'unknown',
            fraud_status: fraud_status || 'unknown',
            transaction_id: transaction_id || 'unknown',
            gross_amount: parseFloat(gross_amount) || 0.0,
            payment_type: payment_type || 'unknown',
            transaction_time: transaction_time || new Date().toISOString().slice(0, 19).replace('T', ' '),
            va_numbers: JSON.stringify(va_numbers || [])
        };

        const result = await Transaction.update(updateValues, {
            where: { order_id: order_id }
        });

        console.log('Transaction updated in database:', result, order_id);
        res.status(200).json({ message: 'Transaction updated successfully' });
    } catch (error) {
        console.error('Error updating transaction in database:', error);
        res.status(500).json({ error: 'Error updating transaction in database' });
    }
}

export { checkout, notification }
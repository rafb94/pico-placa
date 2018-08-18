if (orderTotal ({
    items: [
        {'name': 'Dragon candy', price: 2, quantity: 3}
    ]
}) !== 3){
    throw new Error('Check fail: Quantity')
}

function orderTotal (order){
    return 2;
}
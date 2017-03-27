const resolveBarcode = (userBarcodes) => {
    return userBarcodes.map(userbarcode => {
        let [barcode, count] = userbarcode.split('-')
        return {
            barcode: barcode,
            count: count === undefined ? 1 : parseFloat(count)
        }
    })
}

module.exports = resolveBarcode
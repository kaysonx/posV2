const resolveBarcode = (userBarcodes) =>{
    return userBarcodes.map(barcode => (
        {
            barcode:barcode,
            count:1
        }
    ))
}

module.exports = resolveBarcode
const resolveBarcode = (userBarcodes) => {
    return userBarcodes.map(userbarcode => {
        let [barcode, count] = userbarcode.split('-')
        return {
            barcode: barcode,
            count: count === undefined ? 1 : parseFloat(count)
        }
    })
}

const countBarcode = (barcodeInfos) => {
    let distinctBarcodeInfo = []
    barcodeInfos.map(barcodeInfo => {
        let findBarcode = findBarcodeInfo(distinctBarcodeInfo, barcodeInfo.barcode)
        if (findBarcode === null) {
            distinctBarcodeInfo.push(barcodeInfo)
        } else {
            findBarcode.count += barcodeInfo.count
        }
    })
    return distinctBarcodeInfo
}

const findBarcodeInfo = (barcodeInfos, barcode) => {
    for (let barcodeInfo of barcodeInfos) {
        if (barcodeInfo.barcode === barcode) {
            return barcodeInfo
        }
    }
    return null
}
module.exports = { resolveBarcode, countBarcode }
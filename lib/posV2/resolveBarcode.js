let fixtures = require('./fixtures')

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
        let findBarcode = findObjByBarcode(distinctBarcodeInfo, barcodeInfo.barcode)
        if (findBarcode === null) {
            distinctBarcodeInfo.push(barcodeInfo)
        } else {
            findBarcode.count += barcodeInfo.count
        }
    })
    return distinctBarcodeInfo
}

const findObjByBarcode = (barcodeInfos, barcode) => {
    for (let barcodeInfo of barcodeInfos) {
        if (barcodeInfo.barcode === barcode) {
            return barcodeInfo
        }
    }
    return null
}

const getGoodsInfo = (barcodeInfos) => {
    const items = fixtures.loadAllItems()
    return barcodeInfos.map(barcodeInfo => {
        let findItem = findObjByBarcode(items, barcodeInfo.barcode)
        return Object.assign({}, findItem, { count: barcodeInfo.count })
    })
}

module.exports = { resolveBarcode, countBarcode, getGoodsInfo }
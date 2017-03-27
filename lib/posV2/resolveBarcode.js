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

const getGoodsPromotion = (goodsInfos) => {
    const promotions = fixtures.loadPromotions()
    return goodsInfos.map(goodsInfo => {
        let [findPromotion] = promotions.filter(p => p.barcodes.includes(goodsInfo.barcode))
        let promotion_type = findPromotion === undefined ? "" : findPromotion.type
        return Object.assign({}, goodsInfo, { promotion_type: promotion_type })
    })
}

const countGoodsPrice = (goodsInfo) => {
    if (goodsInfo.promotion_type == 'BUY_TWO_GET_ONE_FREE' && goodsInfo.count > 2) {
        return Object.assign({}, goodsInfo, {
            total_price: (goodsInfo.count - 1) * goodsInfo.price,
            save_price: goodsInfo.price
        })
    }
    return Object.assign({}, goodsInfo, {
        total_price: goodsInfo.count * goodsInfo.price,
        save_price: 0
    })
}

module.exports = { resolveBarcode, countBarcode, getGoodsInfo, getGoodsPromotion, countGoodsPrice }
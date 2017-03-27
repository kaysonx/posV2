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

const countAllGoodsPrice = (goodsInfos) => {
    let all_price = 0
    let all_save = 0
    let cartItems = []
    goodsInfos.map(goodsInfo => {
        let cartItem = countGoodsPrice(goodsInfo)
        cartItems.push(cartItem)
        all_price += cartItem.total_price
        all_save += cartItem.save_price
    })
    return {
        cartItems,
        all_price,
        all_save
    }
}

const print = (receipt) => {
    let formattedDateString = getTimeStr()
    let printText = `***<没钱赚商店>收据***\n打印时间：${formattedDateString}\n----------------------`
    for (let cartItem of receipt.cartItems) {
        printText += `\n名称：${cartItem.name}，数量：${cartItem.count}${cartItem.unit}，单价：${cartItem.price.toFixed(2)}(元)，小计：${cartItem.total_price.toFixed(2)}(元)`
    }
    printText += `\n----------------------\n总计：${receipt.all_price.toFixed(2)}(元)\n节省：${receipt.all_save.toFixed(2)}(元)\n**********************`;
    console.log(printText)
}

const getTimeStr = () => {
    const dateDigitToString = num => (num < 10 ? `0${num}` : num);
    const currentDate = new Date(),
        year = dateDigitToString(currentDate.getFullYear()),
        month = dateDigitToString(currentDate.getMonth() + 1),
        date = dateDigitToString(currentDate.getDate()),
        hour = dateDigitToString(currentDate.getHours()),
        minute = dateDigitToString(currentDate.getMinutes()),
        second = dateDigitToString(currentDate.getSeconds()),
        formattedDateString = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`
    return formattedDateString
}

const printReceipt = (userBarcodes) => {
    let barCodeInfos = resolveBarcode(userBarcodes)
    let countBarcodeInfos = countBarcode(barCodeInfos)
    let basicGoodsInfos = getGoodsInfo(countBarcodeInfos)
    let goodsInfosPromotion = getGoodsPromotion(basicGoodsInfos)
    let receipt = countAllGoodsPrice(goodsInfosPromotion)
    print(receipt)

}

module.exports = {
    resolveBarcode,
    countBarcode,
    getGoodsInfo,
    getGoodsPromotion,
    countGoodsPrice,
    countAllGoodsPrice,
    printReceipt
}

//command + p ctrl + tab
//command + d 重构名字
describe('print receipt', () => {
    let handleBarcode = require('../../lib/posV2/resolveBarcode')

    it('should resolve barcode without count', () => {
        let inputBarcode = ['ITEM000001']
        let expectResult = [{
            barcode: 'ITEM000001',
            count: 1
        }]
        expect(handleBarcode.resolveBarcode(inputBarcode)).toEqual(expectResult)
    })

    it('should resolve barcode contain count', () => {
        let inputBarcode = ['ITEM000001-3']
        let expectResult = [{
            barcode: 'ITEM000001',
            count: 3
        }]
        expect(handleBarcode.resolveBarcode(inputBarcode)).toEqual(expectResult)
    })

    it('should count barcode', () => {
        let inputBarcode = [{
            barcode: 'ITEM000001',
            count: 3
        },
        {
            barcode: 'ITEM000001',
            count: 1
        }]

        let expectResult = [{
            barcode: 'ITEM000001',
            count: 4
        }]
        expect(handleBarcode.countBarcode(inputBarcode)).toEqual(expectResult)
    });


    it('should getGoods info by barcode', () => {
        let inputBarcode = [{
            barcode: 'ITEM000001',
            count: 4
        }]

        let expectResult = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3,
            count: 4
        }]
        expect(handleBarcode.getGoodsInfo(inputBarcode)).toEqual(expectResult)
    });

    it('should get promotion info by barcode', () => {
        let inputGoodsInfo = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3,
            count: 4
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            count: 2.5
        }]

        let expectResult = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3,
            count: 4,
            promotion_type: 'BUY_TWO_GET_ONE_FREE'
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            count: 2.5,
            promotion_type: ""
        }]
        expect(handleBarcode.getGoodsPromotion(inputGoodsInfo)).toEqual(expectResult)
    });

    it('should get count goods price by goodsInfo', () => {
        let inputGoodsInfo = {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3,
            count: 4,
            promotion_type: 'BUY_TWO_GET_ONE_FREE'
        }

        let inputGoodsInfoWithoutPromotion = {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            count: 2.5,
            promotion_type: ""
        }

        let expectResult = {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3,
            count: 4,
            promotion_type: 'BUY_TWO_GET_ONE_FREE',
            total_price: 9,
            save_price: 3
        }
        let expectResultWithoutPromotion = {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            count: 2.5,
            promotion_type: "",
            total_price: 37.5,
            save_price: 0
        }

        expect(handleBarcode.countGoodsPrice(inputGoodsInfo)).toEqual(expectResult)
    });

    it('should get count all goods price and save by goodsInfos', () => {
        let inputGoodsInfos = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3,
            count: 4,
            promotion_type: 'BUY_TWO_GET_ONE_FREE'
        }, {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15,
            count: 2.5,
            promotion_type: ""
        }]

        let expectResult = {
            cartItems: [{
                barcode: 'ITEM000001',
                name: '雪碧',
                unit: '瓶',
                price: 3,
                count: 4,
                promotion_type: 'BUY_TWO_GET_ONE_FREE',
                total_price: 9,
                save_price: 3
            }, {
                barcode: 'ITEM000003',
                name: '荔枝',
                unit: '斤',
                price: 15,
                count: 2.5,
                promotion_type: "",
                total_price: 37.5,
                save_price: 0
            }],
            all_price: 46.5,
            all_save: 3
        }

        expect(handleBarcode.countAllGoodsPrice(inputGoodsInfos)).toEqual(expectResult)
    });


    it('should print text', () => {
        const tags = [
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000001',
            'ITEM000003-2.5',
            'ITEM000005',
            'ITEM000005-2',
        ];

        const dateDigitToString = num => (num < 10 ? `0${num}` : num);

        spyOn(console, 'log');

        handleBarcode.printReceipt(tags);

        const currentDate = new Date(),
            year = dateDigitToString(currentDate.getFullYear()),
            month = dateDigitToString(currentDate.getMonth() + 1),
            date = dateDigitToString(currentDate.getDate()),
            hour = dateDigitToString(currentDate.getHours()),
            minute = dateDigitToString(currentDate.getMinutes()),
            second = dateDigitToString(currentDate.getSeconds()),
            formattedDateString = `${year}年${month}月${date}日 ${hour}:${minute}:${second}`;

        const expectText = `***<没钱赚商店>收据***
打印时间：${formattedDateString}
----------------------
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2.5斤，单价：15.00(元)，小计：37.50(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：58.50(元)
节省：7.50(元)
**********************`;
        expect(console.log).toHaveBeenCalledWith(expectText);
    });


});

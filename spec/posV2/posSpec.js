

describe('Resolve barcode', () => {
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
        }]

        let expectResult = [{
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3,
            count: 4,
            promotion_type: 'BUY_TWO_GET_ONE_FREE'
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
            }],
            all_price: 9,
            all_save: 3
        }

        expect(handleBarcode.countAllGoodsPrice(inputGoodsInfos)).toEqual(expectResult)
    });

});

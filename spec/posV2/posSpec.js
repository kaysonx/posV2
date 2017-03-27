

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


});

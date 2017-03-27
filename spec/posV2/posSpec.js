

describe('Resolve barcode', () => {
    let resolveBarcode = require('../../lib/posV2/resolveBarcode')

    it('should resolve barcode without count', ()=>{
        let inputBarcode = ['ITEM000001']
        let expectResult = [{
            barcode:'ITEM000001',
            count:1
        }]
        expect(resolveBarcode(inputBarcode)).toEqual(expectResult)
    })

    //  it('should resolve barcode contain count', ()=>{
    //     let inputBarcode = ['ITEM000001-3']
    //     let expectResult = [{
    //         barcode:'ITEM000001',
    //         count:3
    //     }]
    //     expect(resolveBarcode(inputBarcode)).toEqual(expectResult)
    // })
});
    
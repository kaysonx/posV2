

describe('Resolve barcode', () => {
    it('resolve barcode without count', ()=>{
        let inputBarcode = ['ITEM000001']
        let expectResult = [{
            barcode:'ITEM000001',
            count:1
        }]
        expect(resolve(inputBarcode)).toEqual(expectResult)
    })

     it('resolve barcode contain count', ()=>{
        let inputBarcode = ['ITEM000001-3']
        let expectResult = [{
            barcode:'ITEM000001',
            count:3
        }]
        expect(resolve(inputBarcode)).toEqual(expectResult)
    })
});
    
export function removeDupWithProp(arrDup: any[], prop: string): any[] {
    return Array.from(new Set(arrDup.map(v => v[prop]))).map(objProp => {
        return arrDup.find(obj => obj[prop] === objProp)
    });
}

export function unSignedArray(arrUnsigned: any[], prop: string = ""): any[] {
    let arr = [...arrUnsigned];
    prop !== "" && arrUnsigned.forEach((v, i) => {
        arr[i][prop] = unsignedString(v[prop]);
    });
    prop === "" && arrUnsigned.forEach((v, i)=>{
        arr[i] = unsignedString(v);
    });
    return arr;
}

export function unsignedString(obj: string): string {
    const signString = "ăâđêôơưàảãạáằẳẵặắầẩẫậấèẻẽẹéềểễệếìỉĩịíòỏõọóồổỗộốờởỡợớùủũụúừửữựứỳỷỹỵýĂÂĐÊÔƠƯÀẢÃẠÁẰẲẴẶẮẦẨẪẬẤÈẺẼẸÉỀỂỄỆẾÌỈĨỊÍÒỎÕỌÓỒỔỖỘỐỜỞỠỢỚÙỦŨỤÚỪỬỮỰỨỲỶỸỴÝ".split("");
    const unsignString = "aadeoouaaaaaaaaaaaaaaaeeeeeeeeeeiiiiiooooooooooooooouuuuuuuuuuyyyyyAADEOOUAAAAAAAAAAAAAAAEEEEEEEEEEIIIIIOOOOOOOOOOOOOOOUUUUUUUUUUYYYYY".split("");
    let str = obj.split("");
    for (let i = 0; i < obj.length; i++) {
        if (signString.includes(obj[i])) {
            const idx = signString.indexOf(obj[i]);
            str[i] = unsignString[idx];
        }
    }
    return str.join("");
}
function layDanhSachSinhVien () {
    var promise = axios ({
        url : 'https://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien',
        method : 'GET'
    });
    promise.then(function(ketQua){
        console.log(ketQua.data);
        var arrSinhVien = ketQua.data;

        // cách 1
        // var html ='';
        // for (var i=0;i<arrSinhVien.length;i++){
        //     var sinhVien = arrSinhVien[i];

        //     html += 
        //     `
        //         <tr>
        //             <td>${sinhVien.maSinhVien}</td>
        //             <td>${sinhVien.tenSinhVien}</td>
        //             <td>${sinhVien.email}</td>
        //             <td>${sinhVien.soDienThoai}</td>
        //             <td></td>
        //         </tr>
        //     `
        // }
        // document.querySelector('#tblSinhVien').innerHTML = html;

        // cách 2
        renderSinhVien(arrSinhVien);

    })
    promise.catch(function(err){
        console.log(err);
    })
}
function renderSinhVien(arrSV) {
    let htmlContent = '';
    for (var index = 0; index < arrSV.length; index++) {
        var svNew = new SinhVien();
        /* svNew = {maSinhVien:'',tenSinhVien:'',..., tinhDiemTrungBinh: f{}} */
        var sv = arrSV[index]; /// {maSinhVien:1,tenSinhVien:'A',...}
        Object.assign(svNew, sv);
        htmlContent += `
            <tr>
                <td>${svNew.maSinhVien}</td>
                <td>${svNew.tenSinhVien}</td>
                <td>${svNew.email}</td>
                <td>${svNew.soDienThoai}</td>
                <td>${svNew.tinhDiemTrungBinh()}</td>
                <td>
                <button class="btn btn-danger mx-2" onclick="xoaSinhVienTheoMa('${svNew.maSinhVien}')">Xoá</button>
                <button class="btn btn-primary mx-2" onclick="suaSinhVien('${svNew.maSinhVien}')">chỉnh sửa</button>
                </td>
            </tr>
        `
    }

    document.querySelector('#tblSinhVien').innerHTML = htmlContent;
    return htmlContent;
}

layDanhSachSinhVien();

//  đưa dữ liệu về backend , post : thêm dữ liệu lên sever 

document.querySelector('#frmSinhVien').onsubmit = function(event) {
    event.preventDefault();
    var sinhVien = new SinhVien ();
    sinhVien.maSinhVien = document.querySelector('#maSinhVien').value;
    sinhVien.tenSinhVien = document.querySelector('#tenSinhVien').value;
    sinhVien.soDienThoai = document.querySelector('#soDienThoai').value;
    sinhVien.email = document.querySelector('#email').value;
    sinhVien.diemToan = document.querySelector('#diemToan').value;
    sinhVien.diemLy = document.querySelector('#diemLy').value;
    sinhVien.diemHoa = document.querySelector('#diemHoa').value;
    sinhVien.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    sinhVien.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    // dùng ajax gửi dữ liệu về sever 

    var promise = axios ({
        url : 'https://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method : 'POST',
        data:sinhVien // format data đúng như backend yêu cầu ;
    })

    // thành công 
    promise.then(function(ketQua){
        // sau khi thêm thành công 
        console.log(ketQua.data);

        // gọi lại api để load lại table  từ api layDanhSachSinhVien
    })

    // thất bại
    promise.catch(function(err){
        console.log(err);
    })
}
// ----------- del : phương thức xóa

function xoaSinhVienTheoMa(maSinhVienClick) {
    var promise = axios ({
        url : 'https://svcy.myclass.vn/api/SinhVienApi/XoaSinhVien?maSinhVien=' + maSinhVienClick,
        method : 'DELETE' 
    });
    
    promise.then(function(kq){
        console.log(kq);
        // sau khi xóa thành công
        layDanhSachSinhVien(); // gọi lại api lấy danh sách sinh viên
    })
    
    promise.catch(function(err){
        console.log(err)
    })
    
}

/// sửa sinh viên

function suaSinhVien (maSinhVien) {
    var promise = axios ({
        url : 'https://svcy.myclass.vn/api/SinhVienApi/LayThongTinSinhVien?maSinhVien='+maSinhVien,
        method : 'GET'
    });

    promise.then(function(kq) {
        var sv = kq.data;
        // load dữ liệu sinh viên lên giao diện;
        document.querySelector('#maSinhVien').value = sv.maSinhVien;
        document.querySelector('#tenSinhVien').value = sv.tenSinhVien;
        document.querySelector('#email').value = sv.email;
        document.querySelector('#loaiSinhVien').value = sv.loaiSinhVien;
        document.querySelector('#soDienThoai').value = sv.soDienThoai;
        document.querySelector('#diemToan').value = sv.diemToan;
        document.querySelector('#diemHoa').value = sv.diemHoa;
        document.querySelector('#diemLy').value = sv.diemLy;
        document.querySelector('#diemRenLuyen').value = sv.diemRenLuyen;

    })

    promise.catch(function(err){
        console.log(err);
    })
}
// PUT : cập nhật dữ liệu 

document.querySelector('#btnluu').onclick = function () {
    // lấy dữ liệu sau khi người dùng thay đổi trên giao diện , tạo thành format object backend cần.

    var svUpdate = new SinhVien ();
    svUpdate.maSinhVien = document.querySelector('#maSinhVien').value;
    svUpdate.tenSinhVien = document.querySelector('#tenSinhVien').value;
    svUpdate.soDienThoai = document.querySelector('#soDienThoai').value;
    svUpdate.email = document.querySelector('#email').value;
    svUpdate.diemToan = document.querySelector('#diemToan').value;
    svUpdate.diemLy = document.querySelector('#diemLy').value;
    svUpdate.diemHoa = document.querySelector('#diemHoa').value;
    svUpdate.diemRenLuyen = document.querySelector('#diemRenLuyen').value;
    svUpdate.loaiSinhVien = document.querySelector('#loaiSinhVien').value;

    var promise = axios ({
        url : 'https://svcy.myclass.vn/api/SinhVienApi/CapNhatThongTinSinhVien?maSinhVien='+svUpdate.maSinhVien,
        method : 'PUT',
        data : svUpdate // đúng format backend cần
    });
    promise.then(function(kq){
        console.log(kq);
        layDanhSachSinhVien();
    });
    promise.catch(function(err){
        console.log(err);
    })


}



// hàm interval : tự động  thực thi sau 1 khoảng thời gian quy định 

setInterval(function() {
    layDanhSachSinhVien();
},3000);
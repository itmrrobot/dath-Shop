"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     *}], {});
     */
    await queryInterface.bulkInsert(
      "Product",
      [
        {
          ten_san_pham: "ÁO VEST NAM ZID-C",
          slug_san_pham: "",
          so_luong_nhap: 100,
          so_luong_ban: 10,
          id_partner: 1,
          hinh_anh:
            '["aovest1.png","aovest2.jpg","aovest3.jpg","aovest4.jpg","aovest5.jpg"]',
          tinh_trang: 50,
          mo_ta_ngan:
            "VEST DÁNG ÔM BODY GỢI CẢM SEXY HÀNG MÙA XUÂN THU ĐÔNG THỜI TRANG NAM CHẤT LIỆU G05 SẢN PHẨM MỚI, (MIỄN PHÍ VẬN CHUYỂN TOÀN QUỐC).",
          mo_ta_chi_tiet:
            "Khi nhắc đến áo Vest, người ta sẽ nghĩ ngay tới những bộ Âu phục chỉn chu. Chúng mang lại sự lịch lãm, trang nghiêm cho người mặc, thường được diện trong những dịp quan trọng.",
          gia_ban: 1750000,
          gia_khuyen_mai: 1650000,
          CategoryId: 1,
        },
        {
          ten_san_pham: "ÁO HOODIE COOL TEDDY CÁ TÍNH HX074",
          slug_san_pham: "",
          so_luong_nhap: 200,
          so_luong_ban: 100,
          id_partner: 2,
          hinh_anh:
            '["aohoodie1.jpg","aohoodie2.jpg","aohoodie3.jpg","aohoodie4.jpg"]',
          tinh_trang: 100,
          mo_ta_ngan:
            " Áo Hoodie Cool Teddy cá tính HX074 của Navy là một chiếc áo hoodie mềm mại, ấm cúng. Nó được làm từ chất liệu nỉ  cotton có pha sợi spandex giúp co giãn tốt & thoải mái cho người mặc",
          mo_ta_chi_tiet:
            "Áo Hoodie là hàng may mặc đa diện trong thế giới ngày nay. Chúng phục vụ nhiều mục đích, nhiều đối tượng. Từ việc giữ ấm cơ thể trong mùa động lạnh, với chất liệu cotton thấm hút mồ hôi và thoáng mát cũng được sử dụng làm áo khoác chống nắng . Cũng là trang phục thời trang sành điệu. ",
          gia_ban: 248000,
          gia_khuyen_mai: 238000,
          CategoryId: 2,
        },
        {
          ten_san_pham: "ÁO GIA ĐÌNH NAVY X1594V",
          slug_san_pham: "",
          so_luong_nhap: 400,
          so_luong_ban: 30,
          id_partner: 3,
          hinh_anh:
            '["aogiadinh1.jpg","aogiadinh2.jpg","aogiadinh3.jpg","aogiadinh4.jpg"]',
          tinh_trang: 220,
          mo_ta_ngan:
            " Áo có thiết kế đơn giản nhưng sang trọng, phù hợp với mọi lứa tuổi và phong cách. Áo được làm từ chất liệu thun cotton 4 chiều cao cấp, thoáng mát và bền đẹp.",
          mo_ta_chi_tiet:
            "Áo gia đình Navy là một lựa chọn tuyệt vời cho những ai muốn thể hiện sự đoàn kết và yêu thương của gia đình. Áo gia đình Navy sẽ là món quà ý nghĩa cho những dịp đặc biệt như sinh nhật, kỷ niệm, du lịch hay chụp ảnh cùng nhau.",
          gia_ban: 175000,
          gia_khuyen_mai: 165000,
          CategoryId: 3,
        },
        {
          ten_san_pham: "NAVY BSX1189WD",
          slug_san_pham: "",
          so_luong_nhap: 500,
          so_luong_ban: 100,
          id_partner: 1,
          hinh_anh:
            '["aothun1.jpg","aothun2.jpg"]',
          tinh_trang: 50,
          mo_ta_ngan:
            "Áo Sweater Local Cao Cấp Navy là một chiếc áo cổ tròn và dài tay có bo tay và line thuận tiện nhất mà ngành thời trang tạo ra cho giới trẻ.",
          mo_ta_chi_tiet:
            "Chúng được tạo nên từ chất liệu nỉ cotton thấm hút tốt. Ngoài ra, Áo Sweater Cao Cấp  còn phong phú về màu sắc và kiểu dáng. Với đặc tính dễ dàng phối với các loại item thời trang khác nhau, tạo nên nhiều phong cách ấn tượng, mới lạ.  Đây được xem là chiếc áo vô cùng năng động, tươi trẻ và cá tính cần có trong tủ đồ nhà bạn. Áo Sweater Cao Cấp  Navy chất liệu nỉ cotton cao cấp co dãn nhẹ giúp bạn luôn dễ chịu & thoải mái. Dù cho thời tiết nóng hay lạnh và mang trong thời gian dài",
          gia_ban: 388000,
          gia_khuyen_mai: 380000,
          CategoryId: 4,
        },
        {
          ten_san_pham: "ÁO SWEATER NAVY 2010T",
          slug_san_pham: "",
          so_luong_nhap: 300,
          so_luong_ban: 101,
          id_partner: 5,
          hinh_anh:
            '["strong1.jpg","strong2.jpg","strong3.jpg","strong4.jpg"]',
          tinh_trang: 50,
          mo_ta_ngan:
            "Áo Sweater Navy chất nỉ bông của Navy shop là một sản phẩm thời trang phù hợp cho cả nam và nữ trong mùa thu đông",
          mo_ta_chi_tiet:
            "Áo có chất liệu nỉ bông mềm mại, ấm áp và thoáng khí, không gây kích ứng da. Áo Sweater navy có 4 màu trắng, đen, xanh, xám dễ lựa chọn. Áo có thể kết hợp với quần jeans, quần tây, chân váy hoặc đầm để tạo nên phong cách thời trang cá tính và năng động.",
          gia_ban: 198000,
          gia_khuyen_mai: 180000,
          CategoryId: 4,
        },
        {
          ten_san_pham: "SET TẬP GYM 9024D",
          slug_san_pham: "",
          so_luong_nhap: 400,
          so_luong_ban: 180,
          id_partner: 6,
          hinh_anh:
            '["gym1.jpg","gym2.jpg","gym3.jpg","gym4.jpg"]',
          tinh_trang: 59,
          mo_ta_ngan:
            "Set tập gym nỉ cotton thu đông là một lựa chọn hoàn hảo cho những ngày se lạnh. ",
          mo_ta_chi_tiet:
            "Chất liệu nỉ cotton mềm mại, ấm áp và thấm hút mồ hôi tốt, giúp bạn cảm thấy thoải mái và dễ chịu khi mặc. Thiết kế sweater đơn giản nhưng không kém phần thời trang, có thể kết hợp với nhiều loại quần áo khác nhau. Bạn có thể chọn màu sắc phù hợp với phong cách và sở thích của mình, những gam màu trung tính như đen, xám, trắng, xanh biển. Set sweater tập gym nỉ cotton thu đông là món đồ không thể thiếu trong tủ đồ của bạn vào mùa này.",
          gia_ban: 345000,
          gia_khuyen_mai: 345000,
          CategoryId: 5,
        },
        {
          ten_san_pham: "Seiko 41mm Nam SRPD51K2",
          slug_san_pham: "",
          so_luong_nhap: 500,
          so_luong_ban: 100,
          id_partner: 6,
          hinh_anh:
            '["seko1.jpg","seko2.jpg","seko3.jpg","seko4.jpg"]',
          tinh_trang: 150,
          mo_ta_ngan:
            "Seiko là thương hiệu đồng hồ Nhật được sáng lập năm 1881. ",
          mo_ta_chi_tiet:
            "Đây là sản phẩm độc đáo đã bán ra thị trường hơn 8 triệu chiếc năm 2007. Nói nôm na Kinetic là “con lai” giữa máy cơ và máy quartz tích hợp ưu điểm 2 dòng máy này làm nên một thiết kế riêng biệt độc quyền của Seiko.",
          gia_ban: 4750000,
          gia_khuyen_mai: 4650000,
          CategoryId: 6,
        },
        {
          ten_san_pham: "Rolex Nam Datejust-126331-41",
          slug_san_pham: "",
          so_luong_nhap: 1000,
          so_luong_ban: 500,
          id_partner: 6,
          hinh_anh:
            '["rolex.jpg","rolex2.jpg","rolex3.jpg","rolex4.jpg"]',
          tinh_trang: 500,
          mo_ta_ngan:
            "Thương hiệu Rolex (Rolex SA) là hãng đồng hồ Thụy Sỹ được thành lập vào năm 1905 bởi Hans Wilsdorf và Alfred Davis tại London, Anh.",
          mo_ta_chi_tiet:
            "Đến năm 1919, thương hiệu đồng hồ Rolex chính thức chuyển đến Geneva - Thụy Sĩ. Sau đó toàn bộ quy trình sản xuất của hãng đều được thực hiện tại đất nước này.",
          gia_ban: 350000000,
          gia_khuyen_mai: 350000000,
          CategoryId: 6,
        },
        {
          ten_san_pham: "Movado 40mm Nam 0607314",
          slug_san_pham: "",
          so_luong_nhap: 500,
          so_luong_ban: 100,
          id_partner: 6,
          hinh_anh:
            '["movado.jpg","movado2.jpg","movado3.jpg","movado4.jpg"]',
          tinh_trang: 400,
          mo_ta_ngan:
            "Movado là thương hiệu đồng hồ tầm trung nổi tiếng của Thụy Sỹ ra đời vào năm 1881",
          mo_ta_chi_tiet:
            "Ý nghĩa tên thương hiệu “Movado” đó là không ngừng chuyển động. Đây là một ý nghĩa rất sâu sắc vừa hàm nghĩa chỉ sự vận động của thời gian đồng thời là lời khẳng định về một thương hiệu luôn luôn đổi mới, sáng tạo, cải tiến không ngừng.",
          gia_ban: 17500000,
          gia_khuyen_mai: 16500000,
          CategoryId: 6,
        },
        {
          ten_san_pham: "Bulova 42mm Nam 97A111",
          slug_san_pham: "",
          so_luong_nhap: 500,
          so_luong_ban: 400,
          id_partner: 6,
          hinh_anh:
            '["buluva.jpg","buluva2.jpg","buluva3.jpg"]',
          tinh_trang: 50,
          mo_ta_ngan:
            "Bulova là thương hiệu đồng hồ Mỹ ra đời vào năm 1875.",
          mo_ta_chi_tiet:
            "Năm 2008 thương hiệu Bulova đã chính thức được Citizen mua lại. Ngày nay, Bulova được phân phối bởi Citizen (một thương hiệu chế tác đồng hồ Nhật Bản).Bulova có xuất xứ từ Mỹ nhưng chất lượng đạt chuẩn Thụy Sĩ. Bởi vậy mà sau hơn 140 năm tồn tại, cho đến nay Bulova vẫn có chỗ đứng vững chắc trong phân khúc đồng hồ cao cấp.",
          gia_ban: 8750000,
          gia_khuyen_mai: 8650000,
          CategoryId: 6,
        },
        {
          ten_san_pham: "Hublot 42mm Nam 542.NX.1171.LR",
          slug_san_pham: "",
          so_luong_nhap: 500,
          so_luong_ban: 100,
          id_partner: 6,
          hinh_anh:
            '["hublox.jpg","hublox2.jpg","hublox3.jpg"]',
          tinh_trang: 50,
          mo_ta_ngan:
            "Hublot là thương hiệu đồng hồ của Thụy Sỹ thành lập năm 1980.",
          mo_ta_chi_tiet:
            "Đồng hồ Hublot có nguồn gốc từ nước Thụy Sĩ, mang ý nghĩa là cửa sổ. Những chiếc đồng hồ Hublot mang dây đeo làm từ cao su tự nhiên. nhanh chóng tạo thành cơn sốt ngay sau khi ra mắt. Hublot được mệnh danh là đồng hồ của Hoàng gia Châu Âu.",
          gia_ban: 7750000,
          gia_khuyen_mai: 7650000,
          CategoryId: 6,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};

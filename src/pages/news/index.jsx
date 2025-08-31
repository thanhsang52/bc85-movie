import React from "react";

const NewsPage = () => {
  const news = [
    {
      id: 1,
      title: "Phim bom tấn mới sắp ra mắt",
      content: "Bộ phim hành động đình đám sẽ được công chiếu vào tuần tới...",
      date: "15/01/2024",
      image:
        "https://media.vov.vn/sites/default/files/styles/large/public/2024-06/04-dm4-dm-mobile-banner-1080x745-rr-f01-042624-663a430d8a2c1-1.jpg",
    },
    {
      id: 2,
      title: "Khuyến mãi vé xem phim cuối tuần",
      content:
        "Giảm giá 50% cho tất cả các suất chiếu vào thứ 7 và chủ nhật...",
      date: "12/01/2024",
      image:
        "https://media.vov.vn/sites/default/files/styles/large/public/2024-06/0957d1904de477e1ded0b68ce683f806.jpg",
    },
    {
      id: 3,
      title: "Rạp chiếu phim mới khai trương",
      content: "Hệ thống rạp BC85 Movie mở thêm chi nhánh mới tại quận 7...",
      date: "10/01/2024",
      image:
        "https://media.vov.vn/sites/default/files/styles/large/public/2024-06/deadpool-wolverine-mot-avenger-quen-thuoc-se-xuat-hien-240423112943.jpg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tin tức</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{item.date}</p>
              <p className="text-gray-700">{item.content}</p>
              <button className="mt-3 text-blue-500 hover:text-blue-700">
                Đọc thêm →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsPage;

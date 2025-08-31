import React from "react";

const AppPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Ứng dụng BC85 Movie
      </h1>

      <div className="text-center mb-8">
        <img
          src="https://via.placeholder.com/200x200"
          alt="BC85 Movie App"
          className="mx-auto mb-4 rounded-lg"
        />
        <p className="text-lg text-gray-700 max-w-2xl mx-auto">
          Tải ứng dụng BC85 Movie để đặt vé xem phim nhanh chóng, tiện lợi. Nhận
          thông báo về phim mới, khuyến mãi và nhiều tính năng hấp dẫn khác.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Tải cho iOS</h2>
          <a href="#" className="inline-block">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/App_Store_%28iOS%29.svg/768px-App_Store_%28iOS%29.svg.png"
              alt="Download on App Store"
              width={120}
              className="mx-auto"
            />
          </a>
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Tải cho Android</h2>
          <a href="#" className="inline-block">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb5LOPUgzjbz_m4aVulC-GU5zu-30HBdYnAg&s"
              alt="Get it on Google Play"
              width={120}
              className="mx-auto"
            />
          </a>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Tính năng nổi bật
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🎬</div>
            <h3 className="font-semibold mb-2">Đặt vé nhanh chóng</h3>
            <p className="text-gray-600">
              Đặt vé chỉ với vài thao tác đơn giản
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">🔔</div>
            <h3 className="font-semibold mb-2">Thông báo phim mới</h3>
            <p className="text-gray-600">
              Nhận thông báo về phim mới và khuyến mãi
            </p>
          </div>
          <div className="text-center p-4">
            <div className="text-4xl mb-3">💳</div>
            <h3 className="font-semibold mb-2">Thanh toán an toàn</h3>
            <p className="text-gray-600">
              Nhiều phương thức thanh toán tiện lợi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppPage;

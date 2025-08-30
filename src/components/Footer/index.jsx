import React from "react";

const FooterPage = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Movie BC85</h3>
            <p className="text-gray-300">
              Hệ thống rạp chiếu phim hiện đại với chất lượng dịch vụ tốt nhất.
            </p>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Liên kết</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Phim
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Rạp
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Tin tức
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Hỗ trợ</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <a href="#" className="hover:text-white">
                  Liên hệ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Chính sách
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Điều khoản
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-md font-semibold mb-4">Liên hệ</h4>
            <div className="text-gray-300 space-y-2">
              <p>📞 Hotline: 1900-xxxx</p>
              <p>📧 Email: info@moviebc85.com</p>
              <p>📍 Địa chỉ: 123 Đường ABC, TP.HCM</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          <p>&copy; 2025 Movie BC85. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default FooterPage;

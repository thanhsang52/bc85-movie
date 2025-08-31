import React from 'react';

const ContactPage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Liên hệ</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
          <div className="space-y-3">
            <p><strong>Địa chỉ:</strong> 123 Đường ABC, Quận 1, TP.HCM</p>
            <p><strong>Hotline:</strong> 1900-xxxx</p>
            <p><strong>Email:</strong> info@moviebc85.com</p>
            <p><strong>Giờ làm việc:</strong> 8:00 - 22:00 (Tất cả các ngày)</p>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Gửi tin nhắn</h2>
          <form className="space-y-4">
            <input 
              type="text" 
              placeholder="Họ tên" 
              className="w-full p-3 border rounded"
            />
            <input 
              type="email" 
              placeholder="Email" 
              className="w-full p-3 border rounded"
            />
            <textarea 
              placeholder="Nội dung" 
              rows="4" 
              className="w-full p-3 border rounded"
            ></textarea>
            <button className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
              Gửi tin nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
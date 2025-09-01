import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, message } from "antd";
import { theaterService } from "../../service/theaterService";
import { setTicketRoomAction, addSeatAction, removeSeatAction, clearSelectedSeatsAction } from "../../stores/theater";
import { useSelector as useUserSelector } from "react-redux";

const TicketRoomPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { ticketRoom, selectedSeats } = useSelector(state => state.theaterSlice);
  const { infoUser } = useUserSelector(state => state.userSlice);
  const [loading, setLoading] = useState(false);

  const fetchTicketRoom = async () => {
    try {
      const response = await theaterService.getTicketRoom(id);
      dispatch(setTicketRoomAction(response.data.content));
    } catch (error) {
      console.log(error);
      message.error("Không thể tải thông tin phòng vé");
    }
  };

  useEffect(() => {
    fetchTicketRoom();
  }, [id]);

  const handleSeatClick = (seat) => {
    if (seat.daDat) return;

    const seatIndex = selectedSeats.findIndex((s) => s.maGhe === seat.maGhe);
    if (seatIndex > -1) {
      dispatch(removeSeatAction(seat.maGhe));
    } else {
      dispatch(addSeatAction(seat));
    }
  };

  const getSeatClass = (seat) => {
    if (seat.daDat) return "bg-red-500 cursor-not-allowed";
    if (selectedSeats.find((s) => s.maGhe === seat.maGhe))
      return "bg-green-500";
    if (seat.loaiGhe === "Vip") return "bg-orange-400 hover:bg-orange-500";
    return "bg-gray-300 hover:bg-gray-400";
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.giaVe, 0);

  const handleBookTicket = async () => {
    if (selectedSeats.length === 0) {
      message.warning('Vui lòng chọn ghế!');
      return;
    }

    setLoading(true);
    try {
      const ticketData = {
        maLichChieu: parseInt(id),
        danhSachVe: selectedSeats.map(seat => ({
          maGhe: seat.maGhe,
          giaVe: seat.giaVe
        }))
      };

      await theaterService.bookTicket(ticketData);
      message.success('Đặt vé thành công!');
      dispatch(clearSelectedSeatsAction());
      // Refresh ticket room data
      fetchTicketRoom();
    } catch (error) {
      console.log(error);
      message.error('Đặt vé thất bại: ' + (error.response?.data?.content || 'Vui lòng thử lại'));
    } finally {
      setLoading(false);
    }
  };

  if (!ticketRoom) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Đặt vé xem phim</h1>

      <div className="flex gap-8">
        {/* Cột trái - Ma trận ghế */}
        <div className="w-2/3">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">
              {ticketRoom.thongTinPhim.tenPhim}
            </h2>
            <p className="text-gray-600">
              {ticketRoom.thongTinPhim.tenCumRap} -{" "}
              {ticketRoom.thongTinPhim.tenRap}
            </p>
            <p className="text-gray-600">
              Suất chiếu: {ticketRoom.thongTinPhim.ngayChieu} - {ticketRoom.thongTinPhim.gioChieu}
            </p>
          </div>

          {/* Màn hình */}
          <div className="mb-6">
            <div className="bg-gray-800 text-white text-center py-2 rounded-t-3xl">
              MÀN HÌNH
            </div>
          </div>

          {/* Ma trận ghế 10x16 */}
          <div className="grid grid-cols-16 gap-1 mb-4">
            {ticketRoom.danhSachGhe.map((seat, index) => (
              <button
                key={seat.maGhe}
                onClick={() => handleSeatClick(seat)}
                className={`w-8 h-8 text-xs font-semibold rounded ${getSeatClass(
                  seat
                )} text-white transition-colors`}
                disabled={seat.daDat}
                title={`Ghế ${seat.tenGhe} - ${
                  seat.loaiGhe
                } - ${seat.giaVe.toLocaleString()}đ`}
              >
                {seat.stt}
              </button>
            ))}
          </div>

          {/* Chú thích */}
          <div className="flex gap-6 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <span>Ghế thường</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-400 rounded"></div>
              <span>Ghế VIP</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span>Đang chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded"></div>
              <span>Đã đặt</span>
            </div>
          </div>
        </div>

        {/* Cột phải - Thông tin vé */}
        <div className="w-1/3">
          <div className="bg-gray-50 p-6 rounded-lg sticky top-4">
            <h3 className="text-lg font-semibold mb-4">Thông tin đặt vé</h3>

            <div className="mb-4">
              <img
                src={ticketRoom.thongTinPhim.hinhAnh}
                alt={ticketRoom.thongTinPhim.tenPhim}
                className="w-full h-48 object-cover rounded mb-3"
              />
              <h4 className="font-semibold">
                {ticketRoom.thongTinPhim.tenPhim}
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Cụm rạp:</strong> {ticketRoom.thongTinPhim.tenCumRap}</p>
                <p><strong>Rạp:</strong> {ticketRoom.thongTinPhim.tenRap}</p>
                <p><strong>Suất chiếu:</strong> {ticketRoom.thongTinPhim.ngayChieu} - {ticketRoom.thongTinPhim.gioChieu}</p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-semibold mb-2">Ghế đã chọn:</h5>
              {selectedSeats.length > 0 ? (
                <div className="space-y-2">
                  {selectedSeats.map((seat) => (
                    <div
                      key={seat.maGhe}
                      className="flex justify-between text-sm"
                    >
                      <span>
                        Ghế {seat.tenGhe} ({seat.loaiGhe})
                      </span>
                      <span>{seat.giaVe.toLocaleString()}đ</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">Chưa chọn ghế nào</p>
              )}
            </div>

            <div className="border-t pt-4 mb-4">
              <div className="flex justify-between font-semibold text-lg">
                <span>Tổng tiền:</span>
                <span className="text-red-600">
                  {totalPrice.toLocaleString()}đ
                </span>
              </div>
            </div>

            <Button
              type="primary"
              size="large"
              className="w-full"
              disabled={selectedSeats.length === 0}
              loading={loading}
              onClick={handleBookTicket}
            >
              Đặt vé ({selectedSeats.length} ghế)
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketRoomPage;

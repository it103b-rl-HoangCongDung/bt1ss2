/**
 * Môn học: [RL-IT103B-K25] - Xây dựng ứng dụng web với Javascript
 * Bài tập: Bài 1 - Session 2
 * Tiêu đề: 1. Dò luồng & Sửa lỗi Tính Cước Lũy tiến Chuyến xe GrabRide
 * 
 * BẢNG KIỂM THỬ (TESTCASE TABLE):
 * ---------------------------------------------------------------------------------------------------------
 * Trường hợp kiểm thử          | Dữ liệu đầu vào                     | Kết quả sai thực tế | Kết quả đúng mong đợi
 * ---------------------------------------------------------------------------------------------------------
 * TC01: Cuốc xe ngắn           | distanceInKm = 2, isHeavyRain = false | 12,000 VNĐ          | 12,000 VNĐ
 * TC02: Cuốc xe vượt hạn mức   | distanceInKm = 4, isHeavyRain = true  | 36,480 VNĐ          | 25,200 VNĐ
 * ---------------------------------------------------------------------------------------------------------
 */

// Thiết lập thông tin chuyến đi GrabRide
const bookingId = 'GRB-84920';
const customerName = 'Trần Thị Mai';
const distanceInKm = 4;
const isHeavyRain = true;

const baseFare = 12000;
const extraFarePerKm = 4500;
let totalFare = 0;

// Phòng vệ dữ liệu đầu vào cơ bản
if (distanceInKm < 0) {
  console.error('Lỗi: Quãng đường không thể là số âm!');
} else {
  // Phân loại tính cước cơ sở đã được sửa lỗi logic lũy tiến
  if (distanceInKm <= 2) {
    totalFare = baseFare;
  } else {
    totalFare = baseFare + (distanceInKm - 2) * extraFarePerKm;
  }

  // Áp dụng phụ phí thời tiết mưa lớn
  if (isHeavyRain) {
    totalFare = totalFare * 1.2;
  }

  console.log('Mã chuyến đi:', bookingId);
  console.log('Khách hàng:', customerName);
  console.log('Quãng đường:', distanceInKm, 'km');
  console.log('Tổng cước chuyến đi:', totalFare, 'VNĐ');
}
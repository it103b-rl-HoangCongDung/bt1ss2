# BÁO CÁO PHÂN TÍCH LỖI LOGIC TÍNH CƯỚC LŨY TIẾN GRABRIDE VÀ KIỂM THỬ MÃ NGUỒN

> 👤 **Học viên:** Hoàng Công Dũng | **Mã SV:** PTIT-HCM-009
> 🏫 **Môn học:** it103b-rl-HoangCongDung

---

## 📊 Sơ đồ thiết kế hệ thống (Activity Diagram)

> 💡 *Sơ đồ dưới đây được render tự động trực tiếp trên GitHub bằng Mermaid. Bạn cũng có thể tải file **`bt1.drawio`** trong repository này để mở và chỉnh sửa trực tiếp trên [Draw.io (diagrams.net)](https://app.diagrams.net).* 

```mermaid
graph TD
  Start([Bắt đầu chuyến đi]) --> Input[Nhập quãng đường distanceInKm và trạng thái mưa isHeavyRain]
  Input --> CheckDist{distanceInKm <= 2?}
  CheckDist -- Đúng --> CalcBase[totalFare = baseFare]
  CheckDist -- Sai --> CalcExtra[totalFare = baseFare + (distanceInKm - 2) * extraFarePerKm]
  CalcBase --> CheckRain{isHeavyRain == true?}
  CalcExtra --> CheckRain
  CheckRain -- Đúng --> ApplyRain[totalFare = totalFare * 1.2]
  CheckRain -- Sai --> SkipRain[Giữ nguyên totalFare]
  ApplyRain --> PrintResult[In thông tin hóa đơn ra console]
  SkipRain --> PrintResult
  PrintResult --> End([Kết thúc chuyến xe])
```

---

## Nhiệm vụ 1: Phân tích lỗi & Lập bảng Test Cases

Sau khi rà soát đoạn mã nguồn do lập trình viên tiền nhiệm để lại, tôi nhận thấy nguyên nhân cốt lõi dẫn đến việc hóa đơn cuốc xe 4 km bị tính tiền gấp rưỡi thực tế nằm ở cấu trúc điều khiển if-else và công thức tính cước lũy tiến.

Cụ thể, tại nhánh else khi quãng đường lớn hơn 2 km, chương trình đang áp dụng công thức: totalFare = baseFare + distanceInKm * extraFarePerKm. Phép toán này đã cộng trực tiếp 4 km vào đơn giá phụ trội, đồng thời cước cơ sở baseFare (vốn đã bao gồm 2 km đầu tiên) vẫn được giữ nguyên. Hậu quả là 2 km đầu tiên đã bị tính tiền trùng lặp hai lần.

Để khắc phục triệt để sự cố này, công thức đúng phải trừ đi 2 km đầu tiên đã tính trong cước cơ sở: totalFare = baseFare + (distanceInKm - 2) * extraFarePerKm.

- Lỗi logic ở dòng lệnh tính cước khi quãng đường vượt quá giới hạn tối thiểu.
- Việc thiếu kiểm tra ràng buộc dữ liệu đầu vào (Edge Cases như số âm hoặc bằng 0) dễ gây phát sinh ngoại lệ.
- Cần áp dụng lập trình phòng vệ (Defensive Programming) để bảo vệ hệ thống trước các dữ liệu bất thường.

| Trường hợp kiểm thử | Dữ liệu đầu vào | Kết quả sai thực tế | Kết quả đúng mong đợi |
| --- | --- | --- | --- |
| TC01: Cuốc xe ngắn dưới hạn mức | distanceInKm = 2, isHeavyRain = false | 12,000 VNĐ | 12,000 VNĐ |
| TC02: Cuốc xe vượt hạn mức có mưa | distanceInKm = 4, isHeavyRain = true | 36,480 VNĐ | 25,200 VNĐ |

## Nhiệm vụ 2: Sửa lỗi mã nguồn

Đã tiến hành viết lại toàn bộ mã nguồn trong tệp solution_ex1.js theo đúng tiêu chuẩn kỹ thuật yêu cầu. Bảng testcase được chú thích đầy đủ ngay phần đầu file để giảng viên thuận tiện chấm điểm.

Mã nguồn đã được bổ sung các điều kiện kiểm tra tính hợp lệ của quãng đường, ngăn chặn triệt để tình trạng tính cước sai lệch cho khách hàng.

- Đảm bảo tuân thủ nghiêm ngặt các quy định đặt tên biến và cấu trúc thư mục của bài tập.
- Kiểm tra kỹ lưỡng các trường hợp biên trước khi đóng gói nộp bài.

---

## 📁 Danh sách tệp tin nộp bài trong Repository
- 📝 `bt1.docx`: Báo cáo tài liệu phân tích nghiệp vụ hoàn chỉnh.
- 🎨 `bt1.drawio`: File thiết kế sơ đồ chuẩn theo quy định đề bài (mở trực tiếp bằng [Draw.io](https://app.diagrams.net) hoặc Lucidchart).
- 💻 `solution_ex1.js`: Mã nguồn chương trình.

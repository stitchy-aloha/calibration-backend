# MECMS: Calibration Recording Database Schema

เอกสารนี้ระบุโครงสร้างฐานข้อมูล (Database Schema) สำหรับระบบ MECMS ในส่วนของการบันทึกผลการสอบเทียบเครื่องมือแพทย์ ซึ่งครอบคลุมข้อมูลผู้ใช้งาน, เครื่องมือมาตรฐาน, สภาพแวดล้อม, ผลการวัดเชิงปริมาณ (ตัวเลข) และผลการประเมินเชิงคุณภาพ (Checkbox)

## ตารางในระบบ (Tables Overview)

1. `user`: ข้อมูลผู้ใช้งานระบบ ช่างเทคนิค และผู้อนุมัติ
2. `standard_tool`: ข้อมูล Master Data ของเครื่องมือมาตรฐานที่ใช้สอบเทียบ
3. `Task`: ใบงานหลักของการสอบเทียบ
4. `task_user`: ตารางเชื่อมระบุผู้ดำเนินการและผู้อนุมัติในแต่ละใบงาน
5. `environment`: ข้อมูลสภาพแวดล้อม (อุณหภูมิ, ความชื้น) ขณะสอบเทียบ
6. `standard_detail`: ตารางเชื่อมระบุว่าใบงานนี้ใช้เครื่องมือมาตรฐานใดบ้าง
7. `measurement`: ผลการสอบเทียบเชิงปริมาณ (มีการกรอกตัวเลขและคำนวณ Error)
8. `qualitative`: ผลการสอบเทียบเชิงคุณภาพ (การประเมินแบบ ผ่าน/ไม่ผ่าน เช่น EKG)

---

## SQL Script (MySQL / MariaDB)

```sql
-- 1. สร้างตาราง Master สำหรับผู้ใช้งาน
CREATE TABLE `user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255),
  `password` varchar(255),
  `email` varchar(255),
  `name` varchar(255),
  `tel` varchar(50),
  `imageUrl` varchar(255),
  `sign_path` varchar(255),
  `hospital_id` int,
  `roleId` int
);

-- 2. สร้างตาราง Master สำหรับเครื่องมือมาตรฐาน
CREATE TABLE `standard_tool` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255),
  `asset_code` varchar(255),
  `serial_number` varchar(255),
  `manufacturer` varchar(255),
  `model` varchar(255),
  `path_pdf` varchar(255),
  `certificate_number` varchar(255),
  `calibration_date_last` date,
  `unit` varchar(50),
  `category_id` int
);

-- 3. สร้างตารางหลัก สำหรับใบงานสอบเทียบ
CREATE TABLE `Task` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `pm_number` varchar(255),
  `result` enum('PASS', 'FAIL', 'PENDING'),
  `status` enum('DRAFT', 'COMPLETED'),
  `path_pdf_cb` varchar(255),
  `path_pdf_pm` varchar(255),
  `createdAt` datetime,
  `equipment_id` int
);

-- 4. สร้างตารางเชื่อม (Junction) จัดการผู้รับผิดชอบในใบงาน
CREATE TABLE `task_user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `task_id` int,
  `technician_id` int,
  `approver_id` int,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`),
  FOREIGN KEY (`technician_id`) REFERENCES `user`(`id`),
  FOREIGN KEY (`approver_id`) REFERENCES `user`(`id`)
);

-- 5. สร้างตารางเก็บข้อมูลสภาพแวดล้อมตอนสอบเทียบ
CREATE TABLE `environment` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `ambient_temp` float,
  `ambient_humidity` float,
  `task_id` int,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`)
);

-- 6. สร้างตารางเชื่อม (Junction) ระบุว่าใบงานนี้ใช้เครื่องมือมาตรฐานตัวไหนบ้าง
CREATE TABLE `standard_detail` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `task_id` int,
  `standard_tool_id` int,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`),
  FOREIGN KEY (`standard_tool_id`) REFERENCES `standard_tool`(`id`)
);

-- 7. สร้างตารางเก็บผลการสอบเทียบเชิงปริมาณ (แบบกรอกตัวเลข)
CREATE TABLE `measurement` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `parameter_name` varchar(255),
  `range` float,
  `standard_value` float,
  `reading_1` float,
  `reading_2` float,
  `reading_3` float,
  `average_value` float,
  `error_value` float,
  `result` enum('PASS', 'FAIL'),
  `task_id` int,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`)
);

-- 8. สร้างตารางเก็บผลการสอบเทียบเชิงคุณภาพ (แบบ Checkbox/EKG)
CREATE TABLE `qualitative` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `item_name` varchar(255),
  `result` enum('PASS', 'FAIL', 'NA'),
  `task_id` int,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`)
);
```

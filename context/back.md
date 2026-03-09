# Engineering Context: Medical Equipment Calibration Management System (MECMS)

## Module: Preventive Maintenance (PM) Checklist

บันทึกชุดนี้จัดทำขึ้นเพื่อเป็นแนวทางในการพัฒนาส่วนงาน "การตรวจสอบสภาพภายนอก" สำหรับนิสิตที่พัฒนาระบบด้วย Quasar Framework, Node.js และ MySQL (XAMPP)

---

## 1. Database Schema (SQL)

โครงสร้างนี้รองรับการเก็บข้อมูลผลการตรวจ (Pass/Fail/NA) และหมายเหตุแยกตามหมวดหมู่ตามหน้า UI จริง

```sql
-- 1. ตารางหลักของงาน PM
CREATE TABLE `Task` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `pm_number` varchar(50) NOT NULL UNIQUE,
  `result` enum('Pass', 'Fail', 'N/A') DEFAULT 'N/A',
  `status` enum('Draft', 'Done') DEFAULT 'Draft',
  `path_pdf_cb` varchar(255),
  `path_pdf_pm` varchar(255),
  `createdAt` datetime DEFAULT CURRENT_TIMESTAMP,
  `equipment_id` int NOT NULL
);

-- 2. หมวดหมู่ของ Checklist (เช่น ตรวจสภาพทั่วไป, ความปลอดภัย)
CREATE TABLE `Checklist_Categories` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(255) NOT NULL
);

-- 3. รายการตรวจในแต่ละหมวดหมู่
CREATE TABLE `Checklist_Items` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `item_name` varchar(255) NOT NULL,
  `category_id` int,
  FOREIGN KEY (`category_id`) REFERENCES `Checklist_Categories`(`id`)
);

-- 4. ผลการตรวจรายข้อ (เชื่อม Task กับ Item)
CREATE TABLE `PM_Checklist_Results` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `result` enum('Pass', 'Fail', 'N/A') NOT NULL,
  `task_id` int NOT NULL,
  `checklist_item_id` int NOT NULL,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`),
  FOREIGN KEY (`checklist_item_id`) REFERENCES `Checklist_Items`(`id`)
);

-- 5. หมายเหตุ (Remarks) แยกตามหมวดหมู่ต่อหนึ่ง Task
CREATE TABLE `PM_Category_Remarks` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `remark` text,
  `task_id` int NOT NULL,
  `category_id` int NOT NULL,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`),
  FOREIGN KEY (`category_id`) REFERENCES `Checklist_Categories`(`id`)
);

-- 6. ตารางกลางสำหรับจัดการผู้ใช้ (Technician/Approver)
CREATE TABLE `task_user` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `task_id` int NOT NULL,
  `technician_id` int,
  `approver_id` int,
  FOREIGN KEY (`task_id`) REFERENCES `Task`(`id`)
);
```

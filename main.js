$(document).ready(function () {
    // ดึงรายการผู้ใช้แสดงในรายการเมื่อโหลดหน้า
    fetchUsers();

    // เรียกฟังก์ชัน fetchUsers เพื่อดึงรายการผู้ใช้จาก JSONPlaceholder API
    function fetchUsers() {
        $.get("https://jsonplaceholder.typicode.com/users", function (data) {
            // ล้างรายการผู้ใช้เก่า
            $("#user-list").empty();

            // วนลูปผู้ใช้และแสดงในรายการ
            data.forEach(function (user) {
                $("#user-list").append(
                    `<li>${user.name} (${user.email}) <button class="edit-user" data-id="${user.id}">แก้ไข</button> <button class="delete-user" data-id="${user.id}">ลบ</button></li>`
                );
            });
        });
    }

    // เมื่อคลิกปุ่ม "เพิ่มผู้ใช้"
    $("#add-user").click(function () {
        $("#user-form").show();
        $("#name").val("");
        $("#email").val("");
    });

    // เมื่อคลิกปุ่ม "ยกเลิก"
    $("#cancel-user").click(function () {
        $("#user-form").hide();
    });

    // เมื่อคลิกปุ่ม "บันทึก"
    $("#save-user").click(function () {
        const name = $("#name").val();
        const email = $("#email").val();

        // ส่ง POST request เพื่อเพิ่มผู้ใช้ใหม่
        $.post(
            "https://jsonplaceholder.typicode.com/users",
            { name: name, email: email },
            function () {
                fetchUsers(); // ดึงรายการผู้ใช้ใหม่
                $("#user-form").hide();
            }
        );
    });

    // เมื่อคลิกปุ่ม "แก้ไข"
    $("#user-list").on("click", ".edit-user", function () {
        const userId = $(this).data("id");

        // ดึงข้อมูลผู้ใช้เดิม
        $.get(`https://jsonplaceholder.typicode.com/users/${userId}`, function (user) {
            $("#name").val(user.name);
            $("#email").val(user.email);
            $("#user-form").show();
        });
    });

    // เมื่อคลิกปุ่ม "ลบ"
    $("#user-list").on("click", ".delete-user", function () {
        const userId = $(this).data("id");

        // ส่ง DELETE request เพื่อลบผู้ใช้
        $.ajax({
            url: `https://jsonplaceholder.typicode.com/users/${userId}`,
            type: "DELETE",
            success: function () {
                fetchUsers(); // ดึงรายการผู้ใช้ใหม่
            },
        });
    });
});

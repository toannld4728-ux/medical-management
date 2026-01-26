import React, { useState } from "react";
import {
  Search,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  X,
  Save,
} from "lucide-react";

/* ================= TYPES ================= */
type Role = "patient" | "doctor" | "clinic";

type UserDetails = {
  notes: string;
  [key: string]: any;
};

type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
  status: "active" | "inactive";
  joinDate: string;
  phone: string;
  details: UserDetails;
};

/* ================= COMPONENT ================= */
export default function UserManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<"all" | Role>("all");
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  /* ================= MOCK DATA ================= */
  const [users, setUsers] = useState<User[]>([
    {
      id: "U-1001",
      name: "Nguyễn Văn An",
      email: "patient@aura.vn",
      role: "patient",
      status: "active",
      joinDate: "2024-01-15",
      phone: "0912-345-678",
      details: {
        notes: "Bệnh nhân có tiền sử tiểu đường type 2.",
      },
    },
    {
      id: "U-1002",
      name: "BS. Trần Thị Bình",
      email: "doctor@aura.vn",
      role: "doctor",
      status: "active",
      joinDate: "2023-05-20",
      phone: "0923-456-789",
      details: {
        notes: "Chuyên gia võng mạc, phản hồi nhanh.",
      },
    },
    {
      id: "U-1003",
      name: "Phòng khám Mắt SG",
      email: "clinic@aura.vn",
      role: "clinic",
      status: "active",
      joinDate: "2023-03-10",
      phone: "028-1234-5678",
      details: {
        notes: "Đối tác chiến lược của AURA.",
      },
    },
  ]);

  /* ================= FILTER ================= */
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchRole = filterRole === "all" || u.role === filterRole;
    return matchSearch && matchRole;
  });

  const roleBadge = (role: Role) => {
    const styleMap: Record<Role, string> = {
      patient: "bg-blue-100 text-blue-700",
      doctor: "bg-green-100 text-green-700",
      clinic: "bg-purple-100 text-purple-700",
    };

    const labelMap: Record<Role, string> = {
      patient: "Bệnh nhân",
      doctor: "Bác sĩ",
      clinic: "Phòng khám",
    };

    return (
      <span className={`px-2 py-1 rounded text-xs ${styleMap[role]}`}>
        {labelMap[role]}
      </span>
    );
  };

  /* ================= SAVE EDIT ================= */
  const handleSave = () => {
    if (!selectedUser) return;

    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? selectedUser : u))
    );

    setSelectedUser(null);
    setIsEditMode(false);
  };

  /* ================= RENDER ================= */
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">Quản lý người dùng</h2>
        <p className="text-gray-600">Xem hồ sơ và chỉnh sửa thông tin</p>
      </div>

      {/* SEARCH */}
      <div className="bg-white p-4 rounded-xl border flex gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Tìm theo tên, email, ID..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <select
          value={filterRole}
          onChange={(e) => setFilterRole(e.target.value as any)}
          className="px-4 py-2 border rounded-lg"
        >
          <option value="all">Tất cả</option>
          <option value="patient">Bệnh nhân</option>
          <option value="doctor">Bác sĩ</option>
          <option value="clinic">Phòng khám</option>
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-white border rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left">Người dùng</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Vai trò</th>
              <th className="px-6 py-3 text-left">Ngày tham gia</th>
              <th className="px-6 py-3 text-left">Trạng thái</th>
              <th className="px-6 py-3 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredUsers.map((u) => (
              <React.Fragment key={u.id}>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <p className="font-medium">{u.name}</p>
                    <p className="text-sm text-gray-500">{u.id}</p>
                  </td>
                  <td className="px-6 py-4">{u.email}</td>
                  <td className="px-6 py-4">{roleBadge(u.role)}</td>
                  <td className="px-6 py-4">
                    {new Date(u.joinDate).toLocaleDateString("vi-VN")}
                  </td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-green-600">
                      <CheckCircle size={16} /> Hoạt động
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        setExpandedUserId(
                          expandedUserId === u.id ? null : u.id
                        )
                      }
                      className="text-orange-600 flex items-center gap-1"
                    >
                      {expandedUserId === u.id ? (
                        <>
                          Thu gọn <ChevronUp size={16} />
                        </>
                      ) : (
                        <>
                          Chi tiết <ChevronDown size={16} />
                        </>
                      )}
                    </button>
                  </td>
                </tr>

                {expandedUserId === u.id && (
                  <tr>
                    <td colSpan={6} className="bg-blue-50 px-6 py-4">
                      <div className="flex justify-between items-center">
                        <p className="text-sm">
                          📌 <strong>Ghi chú:</strong> {u.details.notes}
                        </p>
                        <div className="flex gap-3">
                          <button
                            onClick={() => {
                              setSelectedUser(u);
                              setIsEditMode(false);
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                          >
                            Xem hồ sơ
                          </button>
                          <button
                            onClick={() => {
                              setSelectedUser(u);
                              setIsEditMode(true);
                            }}
                            className="px-3 py-1 border border-blue-600 text-blue-600 rounded text-sm"
                          >
                            Chỉnh sửa
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl p-6 relative">
            <button
              onClick={() => {
                setSelectedUser(null);
                setIsEditMode(false);
              }}
              className="absolute top-4 right-4 text-gray-500"
            >
              <X />
            </button>

            <h3 className="text-xl font-semibold mb-4">
              {isEditMode ? "Chỉnh sửa hồ sơ" : "Hồ sơ người dùng"}
            </h3>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-medium">Họ tên</p>
                {isEditMode ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={selectedUser.name}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        name: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{selectedUser.name}</p>
                )}
              </div>

              <div>
                <p className="font-medium">Email</p>
                <p>{selectedUser.email}</p>
              </div>

              <div>
                <p className="font-medium">Số điện thoại</p>
                {isEditMode ? (
                  <input
                    className="border px-2 py-1 rounded w-full"
                    value={selectedUser.phone}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        phone: e.target.value,
                      })
                    }
                  />
                ) : (
                  <p>{selectedUser.phone}</p>
                )}
              </div>

              <div className="col-span-2">
                <p className="font-medium">Ghi chú</p>
                {isEditMode ? (
                  <textarea
                    className="border px-2 py-1 rounded w-full"
                    rows={3}
                    value={selectedUser.details.notes}
                    onChange={(e) =>
                      setSelectedUser({
                        ...selectedUser,
                        details: {
                          ...selectedUser.details,
                          notes: e.target.value,
                        },
                      })
                    }
                  />
                ) : (
                  <p>{selectedUser.details.notes}</p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 border rounded"
              >
                Đóng
              </button>
              {isEditMode && (
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  <Save size={16} className="inline mr-1" />
                  Lưu
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

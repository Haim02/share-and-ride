import profileImage from "./assets/images/profileImage.jpg";
import bikeImage from "./assets/images/bikeImage.png";

export const userColumns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "name",
    headerName: "שם",
    width: 190,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row.img || profileImage}
            alt="avatar"
          />
          {params.row.name}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "אימייל",
    width: 230,
  },
  {
    field: "status",
    headerName: "סטטוס",
    width: 150,
    renderCell: (params) => {
      return (
        <div className={`cellWithStatus ${params.row.status}`}>
          {params.row.status}
        </div>
      );
    },
  },
];

export const productColumns = [
  { field: "_id", headerName: "ID", width: 90 },
  {
    field: "details.title",
    headerName: "שם",
    width: 190,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img
            className="cellImg"
            src={params.row?.images[0] || bikeImage}
            alt="avatar"
          />
          {params.row?.details?.title}
        </div>
      );
    },
  },
  {
    field: "type",
    headerName: "סוג",
    width: 230,
  },
];

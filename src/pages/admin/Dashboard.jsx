import PageHeader from "../../components/admin/PageHeader";
import AdminCard from "../../components/admin/AdminCard";
import { useEffect, useState } from "react";
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
} from "firebase/firestore";
import { db } from "../../firebase";

function Dashboard() {

    const [stats, setStats] = useState({
        revenue: 0,
        orders: 0,
        products: 0,
        users: 0,
        lowStock: 0,
        todayRevenue: 0,
        totalStock: 0,
        newUsers: 0,
    });
    const [recentOrders, setRecentOrders] = useState([]);
    const [topProducts, setTopProducts] = useState([]);

    useEffect(() => {
        getDashboardData();
        getRecentOrders();
            getTopSellingProducts();
    }, []);

    const getDashboardData = async () => {
  try {

    const productSnapshot = await getDocs(collection(db, "products"));
    const userSnapshot = await getDocs(collection(db, "users"));
    const orderSnapshot = await getDocs(collection(db, "orders"));

    let revenue = 0;
    let todayRevenue = 0;
    let lowStock = 0;
    let totalStock = 0;
    let newUsers = 0;

    const today = new Date();

    // Products
    productSnapshot.forEach((doc) => {
      const product = doc.data();

      revenue += Number(product.total || 0);

      totalStock += Number(product.stock || 0);

      if (Number(product.stock) < 10) {
        lowStock++;
      }
    });

    // Orders
    orderSnapshot.forEach((doc) => {
      const order = doc.data();

      revenue += Number(order.total || 0);

      if (order.createdAt) {
        const orderDate = order.createdAt.toDate();

        if (
          orderDate.getDate() === today.getDate() &&
          orderDate.getMonth() === today.getMonth() &&
          orderDate.getFullYear() === today.getFullYear()
        ) {
          todayRevenue += Number(order.total || 0);
        }
      }
    });

    // Users
    userSnapshot.forEach((doc) => {
      const user = doc.data();

      if (user.createdAt) {

        let createdDate;

        if (user.createdAt.toDate) {
          createdDate = user.createdAt.toDate();
        } else {
          createdDate = new Date(user.createdAt);
        }

        if (
          createdDate.getMonth() === today.getMonth() &&
          createdDate.getFullYear() === today.getFullYear()
        ) {
          newUsers++;
        }
      }
    });

    setStats({
      revenue,
      orders: orderSnapshot.size,
      products: productSnapshot.size,
      users: userSnapshot.size,
      lowStock,
      todayRevenue,
      totalStock,
      newUsers,
    });

  } catch (error) {
    console.log(error);
  }
};

    const getRecentOrders = async () => {
        try {

            const q = query(
                collection(db, "orders"),
                orderBy("createdAt", "desc"),
                limit(5)
            );

            const snapshot = await getDocs(q);

            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setRecentOrders(data);

        } catch (error) {
            console.log(error);
        }
    };

    const getTopSellingProducts = async () => {
    try {

        const snapshot = await getDocs(collection(db, "orders"));

        const soldProducts = {};

        snapshot.forEach((doc) => {

            const order = doc.data();

            order.products.forEach((product) => {

                if (soldProducts[product.productId]) {

                    soldProducts[product.productId].quantity += Number(product.quantity);

                } else {

                    soldProducts[product.productId] = {
                        productId: product.productId,
                        title: product.title,
                        quantity: Number(product.quantity),
                    };

                }

            });

        });

        const result = Object.values(soldProducts)
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 5);

        setTopProducts(result);

    } catch (error) {
        console.log(error);
    }
};

    return (
        <>
            <PageHeader title="Dashboard" />

            <div className="row g-4">

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Total Revenue"
                        value={`₹${stats.revenue.toLocaleString()}`}
                        icon="bi-currency-rupee"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Total Orders"
                        value={stats.orders}
                        icon="bi-bag-check"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Products"
                        value={stats.products}
                        icon="bi-box-seam"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Users"
                        value={stats.users}
                        icon="bi-people"
                    />
                </div>
            </div>
            <div className="row g-4 mt-2">

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Low Stock Products"
                        value={stats.lowStock}
                        icon="bi-exclamation-triangle"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="New Users"
                        value={stats.newUsers}
                        icon="bi-person-plus"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Today's Revenue"
                        value={`₹${stats.todayRevenue.toLocaleString()}`}
                        icon="bi-currency-rupee"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Products In Stock"
                        value={stats.totalStock}
                        icon="bi-boxes"
                    />
                </div>

            </div>
            <div className="admin-card mt-4">

                <h4 className="mb-4">
                    Recent Orders
                </h4>

                <div className="table-responsive">

                    <table className="table table-hover align-middle">

                        <thead>

                            <tr>
                                <th>Order ID</th>
                                <th>Customer</th>
                                <th>Total</th>
                                <th>Payment</th>
                                <th>Status</th>
                                <th>Date</th>
                            </tr>

                        </thead>

                        <tbody>

                            {
                                recentOrders.length === 0 ?

                                    (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No Orders Found
                                            </td>
                                        </tr>
                                    )

                                    :

                                    (
                                        recentOrders.map((order) => (

                                            <tr key={order.id}>

                                                <td>
                                                    {order.id.slice(0, 8)}
                                                </td>

                                                <td>
                                                    {order.customer?.fName} {order.customer?.lName}
                                                </td>

                                                <td>
                                                    ₹{order.total}
                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            order.paymentStatus === "Completed"
                                                                ? "badge bg-success"
                                                                : "badge bg-warning"
                                                        }
                                                    >
                                                        {order.paymentStatus}
                                                    </span>

                                                </td>

                                                <td>

                                                    <span
                                                        className={
                                                            order.orderStatus === "Delivered"
                                                                ? "badge bg-success"
                                                                : order.orderStatus === "Pending"
                                                                    ? "badge bg-warning"
                                                                    : "badge bg-primary"
                                                        }
                                                    >
                                                        {order.orderStatus}
                                                    </span>

                                                </td>

                                                <td>

                                                    {
                                                        order.createdAt
                                                            ?.toDate()
                                                            .toLocaleDateString()
                                                    }

                                                </td>

                                            </tr>

                                        ))
                                    )

                            }

                        </tbody>

                    </table>

                </div>

            </div>
            <div className="admin-card mt-4">

    <h4 className="mb-4">
        Top Selling Products
    </h4>

    <div className="table-responsive">

        <table className="table table-hover">

            <thead>

                <tr>
                    <th>#</th>
                    <th>Product</th>
                    <th>Sold</th>
                </tr>

            </thead>

            <tbody>

                {
                    topProducts.length === 0 ?

                        (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="text-center"
                                >
                                    No Data Found
                                </td>
                            </tr>
                        )

                        :

                        (

                            topProducts.map((product, index) => (

                                <tr key={product.productId}>

                                    <td>{index + 1}</td>

                                    <td>{product.title}</td>

                                    <td>{product.quantity}</td>

                                </tr>

                            ))

                        )

                }

            </tbody>

        </table>

    </div>

</div>
        </>
    );
}

export default Dashboard;
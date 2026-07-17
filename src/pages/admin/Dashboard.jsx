import PageHeader from "../../components/admin/PageHeader";
import AdminCard from "../../components/admin/AdminCard";
import { useEffect, useState } from "react";
import {
    collection,
    getDocs
} from "firebase/firestore";
import { db } from "../../firebase";

function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalCategories, setTotalCategories] = useState(0);

    useEffect(() => {
        getDashboardData();
    }, []);

    const getDashboardData = async () => {
        try {

            // Users
            const userSnapshot = await getDocs(collection(db, "users"));
            setTotalUsers(userSnapshot.size);

            // Products
            const productSnapshot = await getDocs(collection(db, "products"));
            setTotalProducts(productSnapshot.size);

            // Categories
            const categorySnapshot = await getDocs(collection(db, "categories"));
            setTotalCategories(categorySnapshot.size);

            // Orders
            const orderSnapshot = await getDocs(collection(db, "orders"));

            setTotalOrders(orderSnapshot.size);

            let revenue = 0;

            orderSnapshot.forEach((doc) => {
                revenue += Number(doc.data().total || 0);
            });

            setTotalRevenue(revenue);

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
                        value={`₹${totalRevenue.toLocaleString()}`}
                        icon="bi-currency-rupee"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Total Orders"
                        value={totalOrders}
                        icon="bi-bag-check"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Products"
                        value={totalProducts}
                        icon="bi-box-seam"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Users"
                        value={totalUsers}
                        icon="bi-people"
                    />
                </div>

                <div className="col-md-6 col-xl-3">
                    <AdminCard
                        title="Categories"
                        value={totalCategories}
                        icon="bi-grid"
                    />
                </div>

            </div>

        </>
    );
}

export default Dashboard;
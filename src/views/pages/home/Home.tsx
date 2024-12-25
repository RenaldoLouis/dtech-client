import { endOfDay, startOfDay, subDays } from "date-fns";
import { Button } from 'daya_cipta_erp';
import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getExpensesForEmployee, resetExpenses } from '../../../app/slices/expenseSlice';
import { RootState } from "../../../app/store";
import reactLogo from '../../../assets/react.svg';
import { EXPENSE_API_ITEMS_PER_PAGE } from '../../../constants/expense';
import { ExpenseQueryParams } from '../../../services/api.types';
import "./Home.css";
import viteLogo from '/vite.svg';

const initialFilterValues = {
    start: startOfDay(subDays(new Date(), 60)).toISOString(),
    end: endOfDay(new Date()).toISOString(),
};

const Home = () => {
    const [count, setCount] = useState(0)
    const dispatch = useAppDispatch();

    const [filterObj, setFilterObj] =
        useState<Record<string, any>>(initialFilterValues);

    const { loader, expenseDetails, currPage, hasNextPage, dummyDetails } = useAppSelector(
        (state: RootState) => state.expense
    );
    // TODO: Adjust these method calls once the filter is implemented
    const fetchPaginatedExpenses = useCallback(
        async (pageNum = 1, filters = {}) => {
            // If we pass page = 1, it means we're fetching a new set of data
            // make sure to reset it first
            if (pageNum === 1) {
                dispatch(resetExpenses());
            }

            const queryParams: ExpenseQueryParams = {
                page_no: pageNum,
                per_page: EXPENSE_API_ITEMS_PER_PAGE,
                ...filters,
            };

            await dispatch(
                getExpensesForEmployee({
                    data: queryParams,
                    onError: (msg: string) => {
                        // showToast("error", msg, "Fetch Expense List");
                        alert("Error " + msg)
                    },
                })
            );
        },
        []
    );

    useEffect(() => {
        fetchPaginatedExpenses(1, filterObj);
    }, [fetchPaginatedExpenses, filterObj]);

    console.log("dummyDetails", dummyDetails)

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>Vite + React</h1>
            <div>
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
                <Button label={"asdas"} primary={true}></Button>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p>
                Click on the Vite and React logos to learn more
            </p>
        </>
    )
}

export default Home;
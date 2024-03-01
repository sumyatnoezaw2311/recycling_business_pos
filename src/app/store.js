import { configureStore } from "@reduxjs/toolkit";

//utils
import PageNoReducer from "../features/currentPage";

// auth
import LoginReducer from '../features/auth/login'
import RefreshTokenReducer from '../features/auth/refreshToken'
import ForgotPasswordReducer from '../features/auth/forgotPassword'
import VerifyTokenReducer from "../features/auth/verifyTokenSlice";
import ResetPasswordReducer from "../features/auth/resetPasswordSlice";

//accounts
import AccountsReducer from "../features/accounts/accountsSlice";
import RegAccountReducer from "../features/accounts/registerAccountSlice";
import DisableAccountReducer from "../features/accounts/disableAccountSlice";

//contacts
import ContactsReducer from '../features/contacts/contactsSlice'
import ContactReducer from '../features/contacts/contactSlice'
import CreateContactReducer from "../features/contacts/createContactSlice";
import DeleteContactReducer from "../features/contacts/deleteContactSlice";

//items
import CreateItemReducer from "../features/items/createItemSlice";
import ItemsReducer from '../features/items/itemsSlice'
import ItemReducer from '../features/items/itemSlice'
import DeleteItemReducer from "../features/items/deleteItemSlice";
import FilterItemReducer from "../features/items/filterItemSlice";
import DailyFinishedItemsReducer from "../features/dailyFinished/dailyFinishedItems";
import CreateFinishedItemReducer from '../features/dailyFinished/createFinishedItem';
import DeleteFinishedItemReducer from "../features/dailyFinished/deleteFinishedItem";


//wallet
import MainBalanceReducer from '../features/wallet/mainBalanceSlice'
import TopUpReducer from '../features/wallet/topupSlice'
import WithDrawalReducer from "../features/wallet/withDrawalSlice";
import WalletTransReducer from "../features/wallet/walletTransSlice";

//prices
import PriceChangesReducer from "../features/priceChanges/priceChanges";

//expenses
import ExpenseReducer from "../features/expenses/expensesSlice";
import TotalExpenseReducer from "../features/expenses/totalExpenseSlice";
import DeleteExpenseReducer from "../features/expenses/deleteExpenseSlice";

//report
import DailyBalanceReducer from "../features/report/dailyBalance";
import DailyItemsReducer from "../features/report/dailyItems";

//wages
import WagesReducer from '../features/wage/wagesSlice'
import TotalWageReducer from "../features/wage/totalWageSlice";
import WageReducer from "../features/wage/wageSlice";
import DeleteWageReducer from '../features/wage/deleteWageSlice'

//saleOrPurchase
import SaleOrPurchaseTotalReducer from "../features/saleOrPurchase/saleOrPurchaseTotalSlice";
import SingleSaleOrPurchaseReducer from "../features/saleOrPurchase/singleSaleOrPurchaseSlice";
import DeleteSaleOrPurReducer from "../features/saleOrPurchase/deleteSaleOrPurSlice";
import VoucherStateReducer from "../features/saleOrPurchase/voucherStateSlice";

//sales
import SaleOrPurchaseReducer from "../features/saleOrPurchase/salesOrPurchasesSlice";

//credits
import SaleDebtTotalReducer from "../features/credits/total/saleDebtTotalSlice";
import PurchaseCreditTotalReducer from "../features/credits/total/purchaseCreditTotalSlice";
import SalesDebtsReducer from "../features/credits/saleDebtsSlice";
import PurchasesCreditsReducer from "../features/credits/purchasesCreditsSlice";
import DebtPaymentsReducer from '../features/credits/paymentHistory/debtPaymentsSlice'
import CreditPaymentsReducer from '../features/credits/paymentHistory/creditPaymentsSlice'
import FilteredContactsReducer from "../features/contacts/contactFilterSlice";
import MultiPursReducer from "../features/credits/debtAndCreditPayment/multiPursSlice";
import SingleFinishItemReducer from "../features/dailyFinished/singleFinishItem";
import DeleteDebtReducer from '../features/credits/paymentHistory/deleteDebtSlice'
import DeleteCreditReducer from '../features/credits/paymentHistory/deleteCreditSlice'
import PayDebtReducer from "../features/credits/debtAndCreditPayment/paySaleDebtSlice";
import PayCreditReducer from "../features/credits/debtAndCreditPayment/payPurchaseCreditSlice";





const store = configureStore({
    reducer: {
        page: PageNoReducer,

        voucherState: VoucherStateReducer,
        login: LoginReducer,
        refreshedToken: RefreshTokenReducer,
        forgotPassword: ForgotPasswordReducer,
        verifyToken: VerifyTokenReducer,
        resetPassword: ResetPasswordReducer,

        createAcc: RegAccountReducer,
        disableAcc: DisableAccountReducer,
        users: AccountsReducer,

        createContact: CreateContactReducer,
        deleteContact: DeleteContactReducer,
        contacts: ContactsReducer,
        contact: ContactReducer,
        filteredContacts: FilteredContactsReducer,

        createItem: CreateItemReducer,
        items: ItemsReducer,
        item: ItemReducer,
        deleteItem: DeleteItemReducer,
        filteredItems: FilterItemReducer,

        mainBalance: MainBalanceReducer,
        topUp: TopUpReducer,
        withDrawal: WithDrawalReducer,
        walletTrans: WalletTransReducer,

        priceChanges: PriceChangesReducer,
        expenses: ExpenseReducer,
        deleteExpense: DeleteExpenseReducer,
        totalExpense: TotalExpenseReducer,

        dailyBalances: DailyBalanceReducer,
        dailyItems: DailyItemsReducer,

        wages: WagesReducer,
        wage: WageReducer,
        deleteWage: DeleteWageReducer,
        totalWage: TotalWageReducer,

        singleSaleOrPurchase: SingleSaleOrPurchaseReducer,
        deleteSaleOrPur: DeleteSaleOrPurReducer,
        saleOrPurchaseTotal: SaleOrPurchaseTotalReducer,
        salesOrPurchases: SaleOrPurchaseReducer,
        
        saleDebtTotal: SaleDebtTotalReducer,
        purchaseCreditTotal: PurchaseCreditTotalReducer,
        salesDebts: SalesDebtsReducer,
        deleteDebt: DeleteDebtReducer,
        deleteCredit: DeleteCreditReducer,
        purchasesCredits: PurchasesCreditsReducer,
        debtPayments: DebtPaymentsReducer,
        creditPayments: CreditPaymentsReducer,
        payDebt: PayDebtReducer,
        payCredit: PayCreditReducer,
        multiPursId: MultiPursReducer,
        dailyFinishedItems: DailyFinishedItemsReducer,
        singleFinishedItem: SingleFinishItemReducer,
        createFinishedItem: CreateFinishedItemReducer,
        deleteFinishedItem: DeleteFinishedItemReducer
    }
})

export default store
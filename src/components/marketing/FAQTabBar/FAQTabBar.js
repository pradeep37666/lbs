import React from 'react'
import { FQA_TABS } from '../../../assets/Data/LBSEnum'
import './FAQTabBar.css'

const FAQTabBar = ({ selectedTab, setSelectedTab }) => {
    return (
        <div>
            <div className='faq_tab_section'>
                <p
                    className={selectedTab === FQA_TABS.GENERAL
                        ? 'faq_tab_title faq_tab_selected'
                        : 'faq_tab_title'
                    }
                    onClick={() => setSelectedTab(FQA_TABS.GENERAL)}
                >
                    {FQA_TABS.GENERAL}
                </p>
                <p
                    className={selectedTab === FQA_TABS.LENDER
                        ? 'faq_tab_title faq_tab_selected'
                        : 'faq_tab_title'
                    }
                    onClick={() => setSelectedTab(FQA_TABS.LENDER)}
                >
                    {FQA_TABS.LENDER}
                </p>
                <p
                    className={selectedTab === FQA_TABS.BORROWER
                        ? 'faq_tab_title faq_tab_selected'
                        : 'faq_tab_title'
                    }
                    onClick={() => setSelectedTab(FQA_TABS.BORROWER)}
                >
                    {FQA_TABS.BORROWER}
                </p>
                <p
                    className={selectedTab === FQA_TABS.ACCOUNT
                        ? 'faq_tab_title faq_tab_selected'
                        : 'faq_tab_title'
                    }
                    onClick={() => setSelectedTab(FQA_TABS.ACCOUNT)}
                >
                    {FQA_TABS.ACCOUNT}
                </p>
            </div>
            <div>
                {/* search input */}
            </div>
        </div>
    )
}

export default FAQTabBar
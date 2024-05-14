import React from 'react'

function Sidebar() {
  return (
    <div>
         <div>
                <Sidebar aria-label="Sidebar with content separator example" className="fixed left-0 z-50" style={{marginTop:"133px"}}>

                    <Sidebar.Items className='pt-5'>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={MdOutlineSpaceDashboard} onClick={handleDashboard}>
                                Dashboard
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={MdOutlineAddCircleOutline} onClick={handleAddSale}>
                                New sale
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={MdOutlinePayment}>
                                Payment
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={MdFormatListBulleted} onClick={handleSalesSummary}>
                                Sales Summary
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={IoSearchSharp}>
                                Remaining Stock
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={FiMapPin}>
                                Locations
                            </Sidebar.Item>

                        </Sidebar.ItemGroup>
                        <Sidebar.ItemGroup>
                            <Sidebar.Item href="#" icon={MdOutlineAccountCircle} onClick={handleMyAccount}>
                                My account
                            </Sidebar.Item>
                            <Sidebar.Item href="#" icon={BiBuoy}>
                                Help
                            </Sidebar.Item>
                        </Sidebar.ItemGroup>
                        </Sidebar.Items>
                </Sidebar>
            </div>
    </div>
  )
}

export default Sidebar
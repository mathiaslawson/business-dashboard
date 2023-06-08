import React, {useMemo} from 'react'
import DashboardBox from '@/components/DashboardBox'
import { useGetKpisQuery } from '@/state/api'
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import {useTheme, useMediaQuery} from '@mui/material'
import BoxHeader from '@/components/BoxHeader'

type Props = {};

const Row1 = (props: Props) => {
  const { palette } = useTheme()

  const smallScreens = useMediaQuery('(max-width: 1200px)')

  const { data } = useGetKpisQuery();
  console.log("🚀 ~ file: Row1.tsx:9 ~ Row1 ~ data:", data)

  const revenueExpenses = useMemo(() => {
    return (
      data && 
      data[0].monthlyData.map(({month, revenue, expenses})=>{
        return {
          name: month.substring(0, 3),
          revenue: revenue,
          expenses: expenses,
        }
      })
    )
  }, 
  [data])
 
  return (
   <>
        <DashboardBox  gridArea='a'>
        <BoxHeader
          title="Revenue and Expenses"
          subtitle="top line represents revenue, bottom line represents expenses"
          sideText="+4%"
        />

        <ResponsiveContainer width="100%" height={smallScreens ? '80%' : '80%'}>
        <AreaChart
          width={500}
          height={400}
          data={revenueExpenses}
          margin={{
            top: 10,
            right: 30,
            left: 0, 
            bottom: 0,
          }}
        >
          <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
              <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0.5}
                />
                <stop
                  offset="95%"
                  stopColor={palette.primary[300]}
                  stopOpacity={0}
                />
              </linearGradient>
          </defs>
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: '10px' }}/>
          <YAxis tickLine={false} style={{ fontSize: '10px' }} axisLine={{strokeWidth: '0'}} domain={[8000, 23000]}/>
          <Tooltip />
          <Area type="monotone" dataKey="revenue" dot={true} stroke={palette.primary.main} fillOpacity={1} fill="url(#colorRevenue )" />
          <Area type="monotone" dataKey="expenses" stroke={palette.primary.main} dot={true} fillOpacity={1} fill="url(#colorExpenses )" />
        </AreaChart>
      </ResponsiveContainer>
        </DashboardBox>


        <DashboardBox  gridArea='b'></DashboardBox>

        
        <DashboardBox  gridArea='c'></DashboardBox>
   </>
  )
}

export default Row1
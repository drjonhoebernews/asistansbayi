'use client';

import cn from '@/utils/class-names';
import MetricCard from '@/components/cards/metric-card';
import { Text } from '@/components/ui/text';
import WidgetCard from '@/components/cards/widget-card';
import ExpenseIcon from '@/components/icons/expenses';
import RevenueUpIcon from '@/components/icons/revenue-up';
import SalesIcon from '@/components/icons/sales';
import ContainersIcon from '@/components/icons/containers';
import ExpressDeliveryIcon from '@/components/icons/express-delivery';
import SimpleBar from '@/components/ui/simplebar';
import DropdownAction from '@/components/charts/dropdown-action';
import TrendingUpIcon from '@/components/icons/trending-up';
import TrendingDownIcon from '@/components/icons/trending-down';

const statData = [
  {
    id: '1',
    title: 'Maliyetler',
    icon: <ExpenseIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-red',
    metric: 57890,
    increased: true,
    percentage: '-4.40',
  },
  {
    id: '2',
    title: 'Hasılat',
    icon: <RevenueUpIcon className="h-7 w-7" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    metric: 1390,
    increased: true,
    percentage: '+32.40',
  },
  {
    id: '3',
    icon: <SalesIcon className="h-9 w-9" />,
    graphIcon: <TrendingUpIcon className="me-1 h-4 w-4" />,
    graphColor: 'text-green',
    title: 'Satış',
    metric: 12390,
    increased: true,
    percentage: '+32.40',
  },
];

const viewOptions = [
  {
    value: 'today',
    name: 'Bugün',
  },
  {
    value: 'this-week',
    name: 'GeçenHafta',
  },
];

export default function StatCards({ className }: { className?: string }) {
  function handleChange(viewType: string) {
    console.log('viewType', viewType);
  }

  return (
    <WidgetCard
      rounded="lg"
      className={className}
      title="Genel Görünüm"
      headerClassName="mb-2 @2xl:mb-5"
      action={<DropdownAction options={viewOptions} onChange={handleChange} />}
    >
      <SimpleBar>
        <div className="grid grid-flow-col gap-5 pb-1">
          {statData.map((stat) => (
            <MetricCard
              key={stat.title + stat.id}
              title={stat.title}
              metric={stat.metric}
              icon={stat.icon}
              className="min-w-[240px] border-0 p-1 @2xl:min-w-[280px] lg:p-1"
              titleClassName="capitalize"
              contentClassName="ps-5"
              iconClassName={cn('@5xl:w-20 @5xl:h-20 h-16 w-16')}
              chartClassName="hidden @[200px]:flex @[200px]:items-center h-14 w-24"
            >
              <Text className="mt-5 flex items-center leading-none text-gray-500">
                <Text
                  tag="span"
                  className={cn(
                    'me-2 inline-flex items-center font-medium',
                    stat.graphColor
                  )}
                >
                  {stat.graphIcon}
                  {stat.percentage}%
                </Text>
                <Text tag="span" className="me-1 hidden @[240px]:inline-flex">
                  {stat.increased ? 'artıyor' : 'eksiliyor'}
                </Text>{' '}
                geçen aya göre
              </Text>
            </MetricCard>
          ))}
        </div>
      </SimpleBar>
    </WidgetCard>
  );
}

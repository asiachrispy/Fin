"use client";

import { MetricCardProps } from '@/lib/types';
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function StatCard({ title, value, trend, trendLabel }: MetricCardProps) {
  const displayValue = typeof value === 'number' ? formatCurrency(value) : value;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {title}
        </CardTitle>
        {trend !== undefined && (
          <div className={`flex items-center text-xs ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {trend >= 0 ? (
              <TrendingUp className="mr-1 h-3 w-3" />
            ) : (
              <TrendingDown className="mr-1 h-3 w-3" />
            )}
            {Math.abs(trend)}%
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {displayValue}
        </div>
        {trendLabel && (
          <p className="text-xs text-muted-foreground mt-1">
            {trendLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export const formatCurrency = (v) => {
  if (v === null || v === undefined) return '-';
  return `$${Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
};

export const normalize = (row) => {
  const source = row && row.item ? row.item : row;
  const id = source.itemId ?? source.id ?? source._id ?? row.auctionId ?? null;
  const auctionId = row.auctionId ?? (source.auction && source.auction.auctionId) ?? null;
  const auctionObj = source.auction ?? row.auction ?? null;

  return {
    raw: row,
    id,
    auctionId,
    title: source.title ?? 'Untitled',
    description: source.description ?? '',
    imageUrl: source.imageUrl ?? source.image ?? '',
    auctionEnabled: source.auctionEnabled ?? false,
    purchased: source.purchased ?? false,
    auction: auctionObj,
    startingBid: auctionObj?.startingBid ?? auctionObj?.startPrice ?? null,
    winningBid: row.winningBid ?? row.highestBid ?? null,
    payableAmount: row.payableAmount ?? row.amount ?? null,
    ownerUid: source.ownerUid ?? source.owner ?? null,
    rawSource: source,
  };
};

namespace WhaleSpotting.Filters
{
    public class PageFilter
    {
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 10;

        public void Validation()
        {
            PageNumber = PageNumber > 1 ? PageNumber : 1;
            PageSize = PageSize > 0 ? PageSize : 10;
        }
    }
}

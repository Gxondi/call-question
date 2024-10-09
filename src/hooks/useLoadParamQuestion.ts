import { getAllQuestionService } from '../services/question';
import { useSearchParams } from 'react-router-dom';
import { LIST_SEARCH_PARMA_KEYWORD, LIST_PAGE_PARAM_KRY, LIST_PAGE_SIZE_PARAM_KEY, LIST_PAGE_SIZE } from '../constants/index';
import { useRequest } from 'ahooks';

type OptionType = {
    keyword: string;
    isStar: boolean;
    isDeleted: boolean;
    page: number;
    pageSize: number;
}

function useLoadParamQuestion(opt: Partial<OptionType> = {}) {
    const { isStar, isDeleted } = opt;
    const [searchParams] = useSearchParams();

    const { data, loading, error , refresh} = useRequest(async () => {
        const keyword = searchParams.get(LIST_SEARCH_PARMA_KEYWORD) || '';
        const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KRY) || '') || 1;
        const pageSize = parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || '') || LIST_PAGE_SIZE;
        return await getAllQuestionService({ keyword, isStar, page, pageSize, isDeleted } as OptionType);
    }, {
        //依赖searchparams变化.变化就重新请求
        refreshDeps: [searchParams]
    });
    return { data, loading, error , refresh};

}
export default useLoadParamQuestion
